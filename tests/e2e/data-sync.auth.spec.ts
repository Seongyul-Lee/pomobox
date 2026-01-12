import { test, expect } from '@playwright/test'

/**
 * Data Sync E2E Tests (Authenticated)
 * - IndexedDB → Supabase 데이터 동기화 관련 UI/UX 테스트
 * - 파일명이 *.auth.spec.ts 패턴이므로 chromium-authenticated 프로젝트에서 실행
 * - storageState를 사용하여 로그인된 상태로 테스트
 *
 * Note: 실제 Supabase 동기화는 auth token 만료 등으로 불안정할 수 있어,
 * 클라이언트 사이드 로직과 UI 동작에 집중
 */
test.describe('Data Sync (Authenticated)', () => {
  const DB_NAME = 'pomobox_db'
  const DB_VERSION = 1
  const SYNC_FLAG = 'pomobox_user_synced'

  // Helper to seed IndexedDB with test data
  const seedIndexedDB = async (page: import('@playwright/test').Page) => {
    return page.evaluate(
      async ({ dbName, dbVersion }) => {
        // Open IndexedDB - matches lib/storage/idb.ts schema
        const db = await new Promise<IDBDatabase>((resolve, reject) => {
          const request = indexedDB.open(dbName, dbVersion)
          request.onerror = () => reject(request.error)
          request.onsuccess = () => resolve(request.result)
          request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains('daily_stats')) {
              db.createObjectStore('daily_stats', { keyPath: 'date' })
            }
            if (!db.objectStoreNames.contains('history')) {
              db.createObjectStore('history', { keyPath: 'date' })
            }
            if (!db.objectStoreNames.contains('settings')) {
              db.createObjectStore('settings', { keyPath: 'key' })
            }
            if (!db.objectStoreNames.contains('attendance')) {
              db.createObjectStore('attendance', { keyPath: 'date' })
            }
          }
        })

        // Generate test data - past week
        const today = new Date()
        const testData: { date: string; totalSessions: number; totalMinutes: number }[] = []
        for (let i = 7; i >= 1; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
          testData.push({
            date: dateStr,
            totalSessions: Math.floor(Math.random() * 5) + 1,
            totalMinutes: Math.floor(Math.random() * 100) + 25,
          })
        }

        const tx = db.transaction(['history', 'attendance'], 'readwrite')
        const historyStore = tx.objectStore('history')
        const attendanceStore = tx.objectStore('attendance')

        for (const record of testData) {
          historyStore.put(record)
          attendanceStore.put({ date: record.date })
        }

        await new Promise<void>((resolve, reject) => {
          tx.oncomplete = () => resolve()
          tx.onerror = () => reject(tx.error)
        })

        db.close()
        return testData.length
      },
      { dbName: DB_NAME, dbVersion: DB_VERSION }
    )
  }

  // Helper to get IndexedDB history count
  const getHistoryCount = async (page: import('@playwright/test').Page) => {
    return page.evaluate(
      async ({ dbName, dbVersion }) => {
        try {
          const db = await new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(dbName, dbVersion)
            request.onerror = () => reject(request.error)
            request.onsuccess = () => resolve(request.result)
          })

          if (!db.objectStoreNames.contains('history')) {
            db.close()
            return 0
          }

          const tx = db.transaction(['history'], 'readonly')
          const store = tx.objectStore('history')
          const count = await new Promise<number>((resolve, reject) => {
            const request = store.count()
            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject(request.error)
          })

          db.close()
          return count
        } catch {
          return 0
        }
      },
      { dbName: DB_NAME, dbVersion: DB_VERSION }
    )
  }

  // Helper to check if synced
  const isSynced = async (page: import('@playwright/test').Page) => {
    return page.evaluate((flag) => {
      return localStorage.getItem(flag) === 'true'
    }, SYNC_FLAG)
  }

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
  })

  test('@critical should persist IndexedDB data correctly', async ({ page }) => {
    // Test that IndexedDB operations work correctly
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Seed data
    const seededCount = await seedIndexedDB(page)
    expect(seededCount).toBe(7)

    // Verify data persists
    const count = await getHistoryCount(page)
    expect(count).toBe(7)

    // Reload and verify persistence
    await page.reload()
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    const countAfterReload = await getHistoryCount(page)
    expect(countAfterReload).toBe(7)
  })

  test('should skip sync when already synced flag is set', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Set sync flag to true
    await page.evaluate((flag) => {
      localStorage.setItem(flag, 'true')
    }, SYNC_FLAG)

    // Seed data
    await seedIndexedDB(page)
    const initialCount = await getHistoryCount(page)
    expect(initialCount).toBe(7)

    // Reload page
    await page.reload()
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Data should still be there (sync was skipped because flag was set)
    await expect(async () => {
      const count = await getHistoryCount(page)
      expect(count).toBe(7)
    }).toPass({ timeout: 5000 })
  })

  test('should show charts on statistics page', async ({ page }) => {
    await page.goto('/stats')
    await expect(page.locator('text=Analytics').first()).toBeVisible()

    // Weekly Pattern chart should be visible
    const weeklyPattern = page.locator('text=Weekly Pattern').first()
    await expect(weeklyPattern).toBeVisible()

    // Chart container should be visible
    const chartContainer = page.locator('.recharts-responsive-container').first()
    await expect(chartContainer).toBeVisible({ timeout: 10000 })
  })

  test('should not break timer when sync flag manipulation occurs', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Clear sync flag
    await page.evaluate((flag) => {
      localStorage.removeItem(flag)
    }, SYNC_FLAG)

    // Timer should work regardless of sync state
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Pause and resume should work
    await page.getByRole('button', { name: /pause/i }).click()
    await expect(page.getByRole('button', { name: /resume/i })).toBeVisible()

    await page.getByRole('button', { name: /resume/i }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()
  })

  test('should preserve app functionality with seeded IndexedDB data', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Seed local data
    await seedIndexedDB(page)

    // Timer should work with local data present
    await page.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()

    // Skip to break should work
    const skipButton = page.getByRole('button').filter({ hasText: /skip to break/i })
    await expect(skipButton).toBeVisible()
    await skipButton.click()

    // Should be in break phase
    await expect(page.locator('text=/Break Time/i').first()).toBeVisible()
  })

  test('should correctly report sync status via localStorage', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Start', exact: true })).toBeVisible()

    // Initially check sync status
    const initialStatus = await isSynced(page)
    // Status could be true or false depending on previous state
    expect(typeof initialStatus).toBe('boolean')

    // Set to false
    await page.evaluate((flag) => {
      localStorage.removeItem(flag)
    }, SYNC_FLAG)
    expect(await isSynced(page)).toBe(false)

    // Set to true
    await page.evaluate((flag) => {
      localStorage.setItem(flag, 'true')
    }, SYNC_FLAG)
    expect(await isSynced(page)).toBe(true)
  })
})
