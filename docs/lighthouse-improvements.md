# Lighthouse 성능 개선 목록

> 생성일: 2025-12-30
> 기준 URL: http://localhost:3000/en
> Lighthouse 버전: 13.0.1

---

## 현재 점수

| 카테고리 | 점수 | 상태 |
|---------|------|------|
| Performance | 75 → 80+ (예상) | 개선 중 |
| Accessibility | 100 | 우수 |
| Best Practices | 73 | 개선 필요 |
| SEO | 91 | 양호 |

---

## 핵심 메트릭 (Core Web Vitals)

| 메트릭 | 현재 값 | 목표 | 상태 |
|--------|---------|------|------|
| FCP (First Contentful Paint) | 0.9s | < 1.8s | 양호 |
| LCP (Largest Contentful Paint) | 5.1s | < 2.5s | 심각 |
| TBT (Total Blocking Time) | 220ms | < 200ms | 주의 |
| CLS (Cumulative Layout Shift) | 0.09 | < 0.1 | 양호 |
| SI (Speed Index) | 2.2s | < 3.4s | 양호 |

---

## 완료된 작업

### [x] 미사용 JavaScript 제거 (2025-12-30)

- **작업**: recharts → Chart.js 마이그레이션
- **결과**:
  - 번들 크기: 1.67 MB → 1.46 MB (-210 KB, 12.6% 감소)
  - 차트 라이브러리: 367 KB → 150 KB (-217 KB, 59% 감소)
  - 의존성: -36 packages
- **변경 파일**:
  - `components/dashboard-left.tsx`
  - `components/stats-chart.tsx`
  - `next.config.ts`

### [x] 캐시 헤더 설정 (2025-12-30)

- **작업**: 정적 자산에 1년 캐시 적용
- **적용 대상**: svg, jpg, png, gif, ico, webp, woff, woff2, ttf, eot, `/_next/static/*`
- **변경 파일**: `next.config.ts`

### [x] HSTS 헤더 설정 (2025-12-30)

- **작업**: Strict-Transport-Security 헤더 추가
- **설정**: `max-age=31536000; includeSubDomains`
- **변경 파일**: `next.config.ts`

### [x] CSP 헤더 설정 (2025-12-30)

- **작업**: Content-Security-Policy 헤더 추가
- **허용 도메인**:
  - Google AdSense (`pagead2.googlesyndication.com`, `googleads.g.doubleclick.net`)
  - Supabase (`*.supabase.co`)
  - Vercel Analytics (`va.vercel-scripts.com`)
- **변경 파일**: `next.config.ts`

---

## Performance 개선 항목

### [ ] LCP 개선 (5.1s → 2.5s)

**우선순위**: 높음
**예상 효과**: Performance +5~10점

**원인 분석**:
- 주요 컨텐츠(타이머) 렌더링 지연
- 클라이언트 사이드 렌더링 의존

**해결 방안**:
```tsx
// 1. 중요 이미지에 priority 속성 추가
import Image from 'next/image'
<Image src="/hero.png" priority />

// 2. 서버 컴포넌트 활용 극대화
// 클라이언트 컴포넌트 최소화

// 3. 동적 import로 비필수 컴포넌트 지연 로드
const DashboardLeft = dynamic(() => import('@/components/dashboard-left'))
```

---

### [ ] Legacy JavaScript 제거

**우선순위**: 중간
**예상 절감**: 14 KiB

**해결 방안**:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    legacyBrowsers: false,  // IE11 지원 제거
  }
}
```

---

### [ ] Render Blocking 제거

**우선순위**: 중간
**예상 절감**: 110 ms

**해결 방안**:
```tsx
// 폰트 최적화
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // FOUT 허용으로 blocking 방지
})
```

---

### [ ] 캐시 정책 개선

**우선순위**: 중간
**예상 절감**: 17 KiB

**해결 방안**:
```typescript
// next.config.ts
async headers() {
  return [{
    source: '/:all*(svg|jpg|png|woff2)',
    headers: [{
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }]
  }]
}
```

---

### [ ] Long Main-Thread Tasks 제거

**우선순위**: 낮음
**현재**: 4개 long tasks 감지

**해결 방안**:
- 무거운 계산을 Web Worker로 분리
- `requestIdleCallback` 활용
- 코드 스플리팅 강화

---

## Best Practices 개선 항목 (73점)

### [ ] CSP (Content Security Policy) 설정

**우선순위**: 높음
**예상 효과**: Best Practices +10점

**해결 방안**:
```typescript
// middleware.ts 또는 next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
  connect-src 'self' https://*.supabase.co;
  frame-src https://pagead2.googlesyndication.com;
`
```

---

### [ ] 콘솔 에러 정리

**우선순위**: 중간
**현재**: 브라우저 콘솔에 에러 로그 존재

**해결 방안**:
1. `pnpm dev` 실행 후 콘솔 확인
2. 모든 에러/경고 해결
3. production 빌드 전 검증

---

### [ ] HSTS 정책 설정

**우선순위**: 중간

**해결 방안**:
```typescript
// next.config.ts headers
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains'
}
```

---

### [ ] Third-party 쿠키 (1개)

**우선순위**: 낮음
**원인**: Google AdSense 관련 쿠키

**해결 방안**:
- 사용자 동의 배너 구현 권장
- GDPR/CCPA 준수

---

### [ ] COOP 헤더 설정

**우선순위**: 낮음

**해결 방안**:
```typescript
{
  key: 'Cross-Origin-Opener-Policy',
  value: 'same-origin'
}
```

---

### [ ] Trusted Types 설정

**우선순위**: 낮음

**해결 방안**:
- DOM XSS 방어를 위한 Trusted Types 정책 구현
- 복잡도가 높아 추후 검토

---

## SEO 개선 항목 (91점)

### [ ] Meta Description 추가

**우선순위**: 높음
**예상 효과**: SEO 100점

**해결 방안**:
```tsx
// app/[locale]/layout.tsx
export const metadata: Metadata = {
  description: 'Pomodoro timer with statistics dashboard for productive focus sessions. Track your daily goals, weekly trends, and monthly progress.',
}

// 또는 동적 메타데이터
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale
  return {
    description: locale === 'ko'
      ? '생산적인 집중 세션을 위한 뽀모도로 타이머. 일일 목표, 주간 트렌드, 월간 진행 상황을 추적하세요.'
      : 'Pomodoro timer with statistics dashboard for productive focus sessions.',
  }
}
```

---

## 우선순위별 작업 순서

| 순위 | 작업 | 예상 효과 | 난이도 | 예상 시간 |
|------|------|----------|--------|----------|
| 1 | Meta description 추가 | SEO 100점 | 쉬움 | 10분 |
| 2 | 캐시 헤더 설정 | Performance +3~5 | 쉬움 | 15분 |
| 3 | CSP 헤더 설정 | Best Practices +10 | 중간 | 30분 |
| 4 | HSTS 헤더 설정 | Best Practices +5 | 쉬움 | 5분 |
| 5 | Legacy JS 제거 | Performance +2~3 | 중간 | 20분 |
| 6 | 콘솔 에러 정리 | Best Practices +5 | 중간 | 30분 |
| 7 | LCP 최적화 | Performance +5~10 | 어려움 | 2시간+ |

---

## 참고 자료

- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [CSP with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
