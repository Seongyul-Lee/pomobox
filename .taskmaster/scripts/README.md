# Task Master Scripts

## archive-tasks: 완료된 Task 아카이브

완료된 task를 `archived-tasks.json`으로 이동하여 `tasks.json` 파일 크기를 관리합니다.

### 실행 방법

**Windows (PowerShell):**
```powershell
cd C:\Users\lsy\pomobox
powershell -ExecutionPolicy Bypass -File .\.taskmaster\scripts\archive-tasks.ps1
```

**Windows (Git Bash):**
```bash
cd /c/Users/lsy/pomobox
bash .taskmaster/scripts/archive-tasks.sh
```

**macOS/Linux:**
```bash
cd ~/pomobox
bash .taskmaster/scripts/archive-tasks.sh
```

### 동작 방식

1. **백업 생성**: `tasks.backup.YYYYMMDD-HHMMSS.json` 자동 생성
2. **완료 Task 추출**: `status: "done"` task를 추출
3. **아카이브 업데이트**: `archived-tasks.json`에 추가
4. **tasks.json 정리**: 완료된 task 제거, metadata 업데이트

### 결과

```
✓ Archived: 11 tasks → archived-tasks.json
✓ Remaining: 0 tasks in tasks.json
✓ Backup: tasks.backup.20251225-033000.json
```

### 권장 실행 시점

- Phase/Milestone 완료 시
- tasks.json 파일이 25,000 토큰 초과 시
- 월 1회 정기 정리

### 롤백 방법

```bash
# 백업 파일로 복구
cp .taskmaster/tasks/tasks.backup.YYYYMMDD-HHMMSS.json .taskmaster/tasks/tasks.json
```

### 아카이브 파일 구조

```json
{
  "archived": [
    {
      "id": "1",
      "title": "...",
      "status": "done",
      ...
    }
  ],
  "metadata": {
    "lastArchived": "2025-12-25T03:30:00Z",
    "totalArchived": 11
  }
}
```
