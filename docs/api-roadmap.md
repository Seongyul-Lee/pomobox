# API Routes 로드맵

## 개요

pomobox API는 하이브리드 전략을 사용:
- **읽기(GET)**: 클라이언트에서 Supabase 직접 호출 (React Query)
- **쓰기(POST/PUT/DELETE)**: API Routes 경유 (서버 검증)

## 1차 (현재)

| 엔드포인트 | 메서드 | 용도 | 상태 |
|-----------|--------|------|------|
| `/api/sessions` | POST | Focus 세션 저장 | 구현 |
| `/api/check-in` | POST | 출석 체크 | 구현 |
| `/api/settings` | GET/PUT | 사용자 설정 | 구현 |

## 2차

| 엔드포인트 | 메서드 | 용도 | 비고 |
|-----------|--------|------|------|
| `/api/tasks` | CRUD | Task 관리 | localStorage → Supabase 동기화 |
| `/api/stats/weekly` | GET | Rolling 4-Week | 복잡한 집계 쿼리 |

## 3차

| 엔드포인트 | 메서드 | 용도 | 비고 |
|-----------|--------|------|------|
| `/api/stats/advanced/hourly` | GET | 시간대별 히트맵 | 캐싱 필요 |
| `/api/stats/advanced/category` | GET | 카테고리별 통계 | 집계 테이블 |
| `/api/stats/advanced/streak` | GET | 스트릭 분석 | 서버 계산 |

## 인증 방식

모든 API는 Supabase Auth 토큰 검증:

```typescript
const supabase = await createClient()
const { data: { user }, error } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
```

## 에러 코드

| 코드 | 의미 |
|------|------|
| 200 | 성공 (GET) |
| 201 | 생성 성공 (POST) |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 500 | 서버 오류 |
