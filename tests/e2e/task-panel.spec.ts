import { test, expect } from "@playwright/test"

test.describe("Task Panel - Desktop", () => {
  test.use({ viewport: { width: 1920, height: 1080 } })

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await expect(page.getByRole("button", { name: "Start", exact: true })).toBeVisible()
  })

  test("should open task panel when clicking Tasks button", async ({ page }) => {
    // Click Tasks button in sidebar
    await page.getByRole("button", { name: /tasks/i }).click()

    // Verify task panel is visible
    await expect(page.locator('[role="complementary"]')).toBeVisible()
    await expect(page.locator("h2").filter({ hasText: "Tasks" })).toBeVisible()
  })

  test("should close task panel when clicking close button", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()
    await expect(page.locator('[role="complementary"]')).toBeVisible()

    // Click close button
    await page.getByRole("button", { name: "Close" }).click()

    // Verify task panel is hidden (check aria-hidden attribute)
    await expect(page.locator('[role="complementary"]')).toHaveAttribute("aria-hidden", "true")
  })

  test("should close task panel with Escape key", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()
    await expect(page.locator('[role="complementary"]')).toBeVisible()

    // Press Escape
    await page.keyboard.press("Escape")

    // Verify task panel is hidden (check aria-hidden or opacity)
    await expect(page.locator('[role="complementary"]')).toHaveAttribute("aria-hidden", "true")
  })

  test("should add a new task", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()
    await expect(page.locator('[role="complementary"]')).toBeVisible()

    // Add a task
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("My first task")
    await input.press("Enter")

    // Verify task is added
    await expect(page.locator("text=My first task")).toBeVisible()

    // Verify counter updated
    await expect(page.locator("text=1/30")).toBeVisible()
  })

  test("should toggle task completion", async ({ page }) => {
    // Open task panel and add a task
    await page.getByRole("button", { name: /tasks/i }).click()
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Task to complete")
    await input.press("Enter")

    // Wait for task to appear
    await expect(page.locator("text=Task to complete")).toBeVisible()

    // Toggle completion (click the checkbox - initially unchecked)
    await page.getByRole("checkbox", { name: /mark as complete/i }).click()

    // Verify task moved to "Completed" section
    await expect(page.locator("text=Completed (1)")).toBeVisible()

    // Verify checkbox is now checked (aria-label changed to "mark as incomplete")
    const checkedBox = page.getByRole("checkbox", { name: /mark as incomplete/i })
    await expect(checkedBox).toHaveAttribute("aria-checked", "true")

    // Toggle back to incomplete
    await checkedBox.click()

    // Verify checkbox is unchecked (aria-label back to "mark as complete")
    await expect(page.getByRole("checkbox", { name: /mark as complete/i })).toHaveAttribute(
      "aria-checked",
      "false"
    )
  })

  test("should delete a task", async ({ page }) => {
    // Open task panel and add a task
    await page.getByRole("button", { name: /tasks/i }).click()
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Task to delete")
    await input.press("Enter")

    // Wait for task to appear
    await expect(page.locator("text=Task to delete")).toBeVisible()

    // Hover over task to reveal delete button
    await page.locator("text=Task to delete").hover()

    // Click delete button
    await page.getByRole("button", { name: "Delete task" }).click()

    // Verify task is removed
    await expect(page.locator("text=Task to delete")).not.toBeVisible()

    // Verify counter shows 0
    await expect(page.locator("text=0/30")).toBeVisible()
  })

  test("should show empty state when no tasks", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()

    // Verify empty state message
    await expect(page.locator("text=No tasks yet")).toBeVisible()
  })

  test("should persist tasks in localStorage for non-logged in users", async ({ page }) => {
    // Open task panel and add a task
    await page.getByRole("button", { name: /tasks/i }).click()
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Persistent task")
    await input.press("Enter")

    // Verify task exists
    await expect(page.locator("text=Persistent task")).toBeVisible()

    // Reload page
    await page.reload()

    // Open task panel again
    await page.getByRole("button", { name: /tasks/i }).click()

    // Verify task persisted
    await expect(page.locator("text=Persistent task")).toBeVisible()
  })

  test("should show character counter for input", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()

    // Verify initial counter
    await expect(page.locator("text=0/100")).toBeVisible()

    // Type some text
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Hello world")

    // Verify counter updated
    await expect(page.locator("text=11/100")).toBeVisible()
  })

  test("should not add empty task", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()

    // Try to add empty task
    const input = page.getByPlaceholder("Add a new task...")
    await input.press("Enter")

    // Verify no task added
    await expect(page.locator("text=0/30")).toBeVisible()
    await expect(page.locator("text=No tasks yet")).toBeVisible()
  })
})

test.describe("Task Panel - Mobile", () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await expect(page.getByRole("button", { name: "Start", exact: true })).toBeVisible()
  })

  test("should open task panel as bottom sheet on mobile", async ({ page }) => {
    // Click Tasks button (in mobile bottom nav)
    await page.getByRole("button", { name: /tasks/i }).click()

    // Verify dialog is open (mobile uses Dialog, not complementary role)
    await expect(page.getByRole("dialog")).toBeVisible()
    // Verify Tasks heading inside dialog (use first() for multiple matches)
    await expect(
      page.getByRole("dialog").locator("h2").filter({ hasText: "Tasks" }).first()
    ).toBeVisible()
  })

  test("should add and complete task on mobile", async ({ page }) => {
    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()
    await expect(page.getByRole("dialog")).toBeVisible()

    // Add a task
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Mobile task")
    await input.press("Enter")

    // Verify task is added
    await expect(page.locator("text=Mobile task")).toBeVisible()

    // Toggle completion (click the checkbox - initially unchecked)
    await page.getByRole("checkbox", { name: /mark as complete/i }).click()

    // Verify task moved to "Completed" section
    await expect(page.locator("text=Completed (1)")).toBeVisible()

    // Verify checkbox is now checked (aria-label changed to "mark as incomplete")
    await expect(
      page.getByRole("checkbox", { name: /mark as incomplete/i })
    ).toHaveAttribute("aria-checked", "true")
  })
})

test.describe("Task Panel - Limit Warning", () => {
  // Only run on webkit due to zustand hydration timing issues on chromium/firefox
  test.skip(({ browserName }) => browserName !== "webkit", "Skipping on non-webkit browsers")
  test.use({ viewport: { width: 1920, height: 1080 } })

  test("should show warning when reaching 30 tasks limit", async ({ page }) => {
    // Set localStorage before page load using addInitScript
    const tasks = Array.from({ length: 29 }, (_, i) => ({
      id: `task-${i + 1}`,
      title: `Task ${i + 1}`,
      isCompleted: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    const storeData = {
      state: { tasks, isTaskPanelOpen: false },
      version: 0,
    }

    await page.addInitScript((data) => {
      localStorage.setItem("pomobox-tasks", JSON.stringify(data))
    }, storeData)

    await page.goto("/")
    await page.waitForTimeout(1000) // Wait for zustand hydration

    // Open task panel
    await page.getByRole("button", { name: /tasks/i }).click()
    await expect(page.locator('[role="complementary"]')).toBeVisible()

    // Verify 29/30 (with extended timeout for hydration)
    await expect(page.locator("text=29/30")).toBeVisible({ timeout: 10000 })

    // Add 30th task
    const input = page.getByPlaceholder("Add a new task...")
    await input.fill("Task 30")
    await input.press("Enter")
    await page.waitForTimeout(500)

    // Verify 30/30
    await expect(page.locator("text=30/30")).toBeVisible({ timeout: 5000 })

    // Try to add 31st task
    await input.fill("Task 31")
    await input.press("Enter")

    // Verify toast warning (use getByText with partial match)
    await expect(page.getByText(/Limit Reached/)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/You can only have up to 30 tasks/)).toBeVisible()
  })
})
