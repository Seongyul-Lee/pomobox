# HUB (SSOT)

## Snapshot
- Revision: 11
- Update: Last updated (KST) -> 2025-12-22 02:16

## Current
- State: Traceability(Preview baseline + immutable deploy) 고정 완료. P0 오픈: Break phase에서 Reset 시 breakDuration이 아닌 focusDuration으로 리셋되는 버그(정의-구현-UI 정합). (Repo: Seongyul-Lee/pomobox / Prod: https://pomobox.app)
- Branch: preview
- Anchor baseline (commit, last verified): 83c8c61
- Anchor deploy (immutable, for baseline): https://pomobox-3ow8b9boq-tjddbfzsd66-9025s-projects.vercel.app
- Note: 위 baseline/deploy는 '검증 앵커'이며, 문서 커밋으로 생성되는 최신 deploy를 추적하지 않는다.
- QA status: IN-PROGRESS — Gate-P0-A PASS (2025-12-22, video evidence) / Background drift PASS (2025-12-19, chat(6))


## Done (last 3)
- QA: Gate-P0-A PASS 기록(2025-12-22, video evidence) 완료
- Ops: Traceability anchored(## Current의 baseline+immutable) 정합 유지
- QA: Background drift 시나리오 PASS 기록(2025-12-19, chat(6))

## Now (exactly 1)
- P0 처리: 위 Reset(Break) 버그를 Patch Room(#3) 티켓으로 분리/위임

## Blockers/Risks (P0 only)
- P0: Reset/Skip 정합(정의-구현-UI) — 통계/phase 전환 규칙 단일화 필요

## Decision log (last 3)
- [2025-12-22] Decision: Reset/Skip never count as completion; stats increment only when timer naturally reaches 0.
- [2025-12-21] Decision: Timer running 중 duration 변경은 Save 비활성으로 차단.
- [2025-12-21] Decision: Traceability locked (anchor: preview baseline commit + immutable deploy URL; see ## Current).

## Next candidates (top 3)
- Promote rule: P0 해결 + QA PASS 기록(immutable Preview deploy + preview baseline commit 고정) 완료
- Gate-P0-A: In Settings, while the timer is RUNNING, duration controls and Save must be disabled, the helper text “Stop the timer to change durations.” must be shown, and no duration value or countdown may change; once not RUNNING (paused/stopped), controls and Save must re-enable and saving must update idle durations.
- Current gate decision: BLOCK (QA: IN-PROGRESS; P0 open)

## Gate (Release/Exit)
- Promote rule: P0 해결 + QA PASS 기록(immutable Preview deploy + preview baseline commit 고정) 완료
- Gate-P0-A: In Settings, while the timer is RUNNING, duration controls and Save must be disabled, the helper text “Stop the timer to change durations.” must be shown, and no duration value or countdown may change; once not RUNNING (paused/stopped), controls and Save must re-enable and saving must update idle durations.
- Current gate decision: BLOCK (QA: IN-PROGRESS; P0 open)