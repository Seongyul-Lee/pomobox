---
description: 브라우저 콘솔 에러 디버깅
argument-hint: [에러 메시지 또는 URL (기본: localhost:3000)]
allowed-tools: Read, Grep, mcp__playwright__browser_navigate, mcp__playwright__browser_snapshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_network_requests, mcp__playwright__browser_close
---

브라우저 콘솔 에러를 분석하고 해결책을 제시해줘.

## 입력 처리

- URL이 주어지면: 해당 URL로 이동
- 에러 메시지가 주어지면: 해당 에러 분석
- 입력 없으면: localhost:3000 사용

$ARGUMENTS

## 디버깅 절차

### 1. 콘솔 에러 수집
- Playwright로 페이지 열기
- 콘솔 메시지 수집 (error, warning 레벨)
- 네트워크 요청 실패 확인

### 2. 에러 유형 분류
| 유형 | 원인 |
|------|------|
| ReferenceError | 미정의 변수/함수 |
| TypeError | null/undefined 접근 |
| Hydration Error | SSR/CSR 불일치 |
| ChunkLoadError | 동적 import 실패 |
| CORS | API 도메인 문제 |
| Network Error | API 요청 실패 |

### 3. 원인 추적
- 스택 트레이스에서 파일/라인 추출
- 해당 코드 읽고 컨텍스트 파악
- 관련 의존성 확인

### 4. 해결책 제시
- 원인 설명
- 수정 코드 예시
- 재발 방지 방안

## 출력 형식

```
## 발견된 에러 (N개)

### 에러 1: [에러 타입]
- 메시지: ...
- 위치: 파일:라인
- 원인: ...
- 해결: ...
```
