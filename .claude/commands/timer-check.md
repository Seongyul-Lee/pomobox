---
description: 타이머 상태 머신 변경 검토
allowed-tools: Read, Grep, Glob
---

타이머 상태 머신 관련 변경사항을 검토한다.

## 필수 확인 파일
- @lib/state-machine.ts (SSOT)
- @components/pomodoro-timer.tsx (UI)

## 검토 항목

### 1. 상태 전이 검증
- IDLE -> RUNNING (시작)
- RUNNING -> PAUSED (일시정지)
- PAUSED -> RUNNING (재개)
- RUNNING -> COMPLETED (완료)
- * -> IDLE (리셋)

### 2. 엣지 케이스
- 중복 시작 방지
- 음수 시간 처리
- 0초에서의 동작
- 브라우저 탭 비활성화 시 동작

### 3. 통계 기록 정책
- 세션 완료 시에만 기록되는지 확인
- 중간 취소 시 기록되지 않는지 확인
- IndexedDB 저장소 호출 시점

### 4. 사이드 이펙트
- 알림/사운드 트리거 시점
- UI 상태 동기화
- Zustand 스토어 업데이트

## 출력 형식
- 상태 전이 다이어그램 (텍스트)
- 발견된 문제점
- 권장 수정사항
