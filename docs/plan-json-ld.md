# JSON-LD 구조화 데이터 구현 계획

## 목표
Next.js 15 App Router의 native `<script>` 태그를 사용하여 SEO용 JSON-LD 구조화 데이터 적용

---

## 작업 목록

### 작업 1: 메인 페이지 JSON-LD (WebApplication)
**파일**: `app/[locale]/page.tsx`

**구현 내용**:
```tsx
// 페이지 컴포넌트 최상단에 JSON-LD 스크립트 추가
const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Pomobox",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": t("description"), // Home.description 사용
  "featureList": ["Pomodoro Timer", "Task Management", "Statistics", "White Noise"],
  "url": `https://pomobox.app/${locale}`,
  "screenshot": "https://pomobox.app/og-image.png"
}
```

**변경 사항**:
1. `params`에서 `locale` 추출 (현재는 없음, 추가 필요)
2. 컴포넌트 하단(return 내부 마지막)에 `<script type="application/ld+json">` 추가

---

### 작업 2: 가이드 페이지 JSON-LD (Article + FAQPage)
**파일**: `app/[locale]/guide/what-is-pomodoro/page.tsx`

**구현 내용**:
```tsx
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t("hero.title"),
    "author": { "@type": "Organization", "name": "Pomobox Team" },
    "publisher": {
      "@type": "Organization",
      "name": "Pomobox",
      "logo": { "@type": "ImageObject", "url": "https://pomobox.app/logo.png" }
    },
    "datePublished": "2025-01-20",
    "url": `https://pomobox.app/${locale}/guide/what-is-pomodoro`
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t("sections.faq.q1.q"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("sections.faq.q1.a")
        }
      },
      {
        "@type": "Question",
        "name": t("sections.faq.q2.q"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("sections.faq.q2.a")
        }
      }
    ]
  }
]
```

**변경 사항**:
1. 기존 `locale` 변수 활용 (이미 존재)
2. FAQ 데이터를 번역 키에서 동적으로 생성하여 화면-스키마 불일치 방지
3. `</article>` 태그 후 `<script type="application/ld+json">` 추가

---

## 공통 구현 패턴

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLdData)
  }}
/>
```

---

## DoD (Definition of Done)

### 작업 1 완료 조건
- [ ] `app/[locale]/page.tsx`에 WebApplication JSON-LD 추가
- [ ] `locale` 파라미터를 동적 URL에 반영
- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 통과

### 작업 2 완료 조건
- [ ] `app/[locale]/guide/what-is-pomodoro/page.tsx`에 Article + FAQPage JSON-LD 추가
- [ ] FAQ 데이터가 번역 키와 동일한 소스 사용
- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 통과

---

## 우선순위
1. **작업 1**: 메인 페이지 (트래픽 최다)
2. **작업 2**: 가이드 페이지 (SEO 핵심 콘텐츠)

---

## 확인 필요 사항
1. 메인 페이지에서 `params`를 통해 `locale`을 받아야 하는지, 아니면 다른 방식으로 현재 locale을 가져오는지?
