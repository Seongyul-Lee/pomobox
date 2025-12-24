#!/bin/bash
# Task Master Archive Script
# 완료된 task를 archived-tasks.json으로 이동하여 tasks.json 경량화

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
TASKS_FILE="$PROJECT_ROOT/.taskmaster/tasks/tasks.json"
ARCHIVE_FILE="$PROJECT_ROOT/.taskmaster/tasks/archived-tasks.json"
BACKUP_FILE="$PROJECT_ROOT/.taskmaster/tasks/tasks.backup.$(date +%Y%m%d-%H%M%S).json"

echo "=== Task Master Archive Script ==="
echo "Project Root: $PROJECT_ROOT"
echo "Tasks File: $TASKS_FILE"
echo "Archive File: $ARCHIVE_FILE"
echo ""

# Backup current tasks.json
echo "1. Creating backup..."
cp "$TASKS_FILE" "$BACKUP_FILE"
echo "   ✓ Backup created: $BACKUP_FILE"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq first."
    echo "  Windows: choco install jq  or  scoop install jq"
    echo "  macOS: brew install jq"
    echo "  Linux: sudo apt-get install jq  or  sudo yum install jq"
    exit 1
fi

# Extract completed tasks
echo "2. Extracting completed tasks..."
COMPLETED_TASKS=$(jq '.master.tasks | map(select(.status == "done"))' "$TASKS_FILE")
COMPLETED_COUNT=$(echo "$COMPLETED_TASKS" | jq 'length')
echo "   ✓ Found $COMPLETED_COUNT completed tasks"

if [ "$COMPLETED_COUNT" -eq 0 ]; then
    echo "   No completed tasks to archive. Exiting."
    exit 0
fi

# Create or update archive file
echo "3. Updating archive file..."
if [ -f "$ARCHIVE_FILE" ]; then
    # Append to existing archive
    EXISTING_ARCHIVE=$(jq '.archived' "$ARCHIVE_FILE" 2>/dev/null || echo "[]")
    MERGED_ARCHIVE=$(echo "$EXISTING_ARCHIVE $COMPLETED_TASKS" | jq -s 'add')
    jq --argjson archived "$MERGED_ARCHIVE" \
       --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
       '{
         archived: $archived,
         metadata: {
           lastArchived: $timestamp,
           totalArchived: ($archived | length)
         }
       }' <<< '{}' > "$ARCHIVE_FILE"
else
    # Create new archive
    jq --argjson archived "$COMPLETED_TASKS" \
       --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
       '{
         archived: $archived,
         metadata: {
           lastArchived: $timestamp,
           totalArchived: ($archived | length)
         }
       }' <<< '{}' > "$ARCHIVE_FILE"
fi
echo "   ✓ Archive updated with $COMPLETED_COUNT tasks"

# Remove completed tasks from tasks.json
echo "4. Removing completed tasks from tasks.json..."
REMAINING_TASKS=$(jq '.master.tasks | map(select(.status != "done"))' "$TASKS_FILE")
REMAINING_COUNT=$(echo "$REMAINING_TASKS" | jq 'length')

jq --argjson tasks "$REMAINING_TASKS" \
   --argjson taskCount "$REMAINING_COUNT" \
   --argjson completedCount 0 \
   --arg timestamp "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
   '.master.tasks = $tasks |
    .master.metadata.taskCount = $taskCount |
    .master.metadata.completedCount = $completedCount |
    .master.metadata.lastModified = $timestamp' \
   "$TASKS_FILE" > "$TASKS_FILE.tmp" && mv "$TASKS_FILE.tmp" "$TASKS_FILE"

echo "   ✓ Removed $COMPLETED_COUNT completed tasks"
echo "   ✓ Remaining tasks: $REMAINING_COUNT"

# Summary
echo ""
echo "=== Archive Summary ==="
echo "✓ Archived: $COMPLETED_COUNT tasks → $ARCHIVE_FILE"
echo "✓ Remaining: $REMAINING_COUNT tasks in tasks.json"
echo "✓ Backup: $BACKUP_FILE"
echo ""
echo "Done! 🎉"
