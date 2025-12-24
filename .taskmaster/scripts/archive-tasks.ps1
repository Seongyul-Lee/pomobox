# Task Master Archive Script (PowerShell)
# 완료된 task를 archived-tasks.json으로 이동하여 tasks.json 경량화

$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = (Get-Item "$ScriptDir\..\.." -Force).FullName
$TasksFile = Join-Path $ProjectRoot ".taskmaster\tasks\tasks.json"
$ArchiveFile = Join-Path $ProjectRoot ".taskmaster\tasks\archived-tasks.json"
$BackupFile = Join-Path $ProjectRoot (".taskmaster\tasks\tasks.backup." + (Get-Date -Format "yyyyMMdd-HHmmss") + ".json")

Write-Host "=== Task Master Archive Script ===" -ForegroundColor Cyan
Write-Host "Project Root: $ProjectRoot"
Write-Host "Tasks File: $TasksFile"
Write-Host "Archive File: $ArchiveFile"
Write-Host ""

# Backup current tasks.json
Write-Host "1. Creating backup..." -ForegroundColor Yellow
Copy-Item $TasksFile $BackupFile
Write-Host "   ✓ Backup created: $BackupFile" -ForegroundColor Green

# Load tasks.json
Write-Host "2. Loading tasks..." -ForegroundColor Yellow
$TasksData = Get-Content $TasksFile -Raw | ConvertFrom-Json

# Extract completed tasks
$CompletedTasks = $TasksData.master.tasks | Where-Object { $_.status -eq "done" }
$CompletedCount = ($CompletedTasks | Measure-Object).Count

Write-Host "   ✓ Found $CompletedCount completed tasks" -ForegroundColor Green

if ($CompletedCount -eq 0) {
    Write-Host "   No completed tasks to archive. Exiting." -ForegroundColor Yellow
    exit 0
}

# Create or update archive file
Write-Host "3. Updating archive file..." -ForegroundColor Yellow
if (Test-Path $ArchiveFile) {
    # Append to existing archive
    $ArchiveData = Get-Content $ArchiveFile -Raw | ConvertFrom-Json
    $MergedArchive = @($ArchiveData.archived) + @($CompletedTasks)
} else {
    # Create new archive
    $MergedArchive = @($CompletedTasks)
}

$NewArchive = @{
    archived = $MergedArchive
    metadata = @{
        lastArchived = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")
        totalArchived = $MergedArchive.Count
    }
}

$NewArchive | ConvertTo-Json -Depth 100 | Set-Content $ArchiveFile -Encoding UTF8
Write-Host "   ✓ Archive updated with $CompletedCount tasks" -ForegroundColor Green

# Remove completed tasks from tasks.json
Write-Host "4. Removing completed tasks from tasks.json..." -ForegroundColor Yellow
$RemainingTasks = $TasksData.master.tasks | Where-Object { $_.status -ne "done" }
$RemainingCount = ($RemainingTasks | Measure-Object).Count

$TasksData.master.tasks = @($RemainingTasks)
$TasksData.master.metadata.taskCount = $RemainingCount
$TasksData.master.metadata.completedCount = 0
$TasksData.master.metadata.lastModified = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssZ")

$TasksData | ConvertTo-Json -Depth 100 | Set-Content $TasksFile -Encoding UTF8

Write-Host "   ✓ Removed $CompletedCount completed tasks" -ForegroundColor Green
Write-Host "   ✓ Remaining tasks: $RemainingCount" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "=== Archive Summary ===" -ForegroundColor Cyan
Write-Host "✓ Archived: $CompletedCount tasks → $ArchiveFile" -ForegroundColor Green
Write-Host "✓ Remaining: $RemainingCount tasks in tasks.json" -ForegroundColor Green
Write-Host "✓ Backup: $BackupFile" -ForegroundColor Green
Write-Host ""
Write-Host "Done! 🎉" -ForegroundColor Cyan
