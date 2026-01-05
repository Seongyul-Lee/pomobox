# Pomobox 콘텐츠 구조 시각화 및 구현 가이드

---

## 1. 현재 정보 구조 (Information Architecture)

### 1.1 사이트 맵 - 현재 상태

```
pomobox.app/
├── /                          (Home - Timer)
├── /dashboard                 (Statistics)
├── /stats                      (Analytics)
├── /mypage                     (User Account)
│
├── /guide/                     (Educational Content)
│   ├── what-is-pomodoro/
│   ├── pomodoro-for-students/
│   ├── pomodoro-for-developers/
│   ├── how-to-avoid-distractions/
│   └── pomodoro-vs-timeboxing/
│
├── /blog/                      (Informational)
│   ├── pomodoro-history/
│   └── science-of-focus/
│
├── /help/                      (Support)
│   ├── faq/
│   ├── contact/
│
├── /company/                   (Legal/About)
│   ├── about/
│   ├── privacy/
│   ├── terms/
│   └── auth/
│       ├── login/
│       ├── signup/
│       └── forgot-password/
│
└── /media/                     (Legal)
    └── contact/
```

**문제점**:
- `/guide` + `/blog` 혼재 (개념 구분 부족)
- 계층 구조가 얕음 (3단계)
- Content Cluster 미분명

---

### 1.2 권장 정보 구조 (개선 안)

```
pomobox.app/
│
├── (도구 영역)
├── /                          Home
├── /dashboard                 Dashboard
├── /stats                      Statistics
└── /mypage                     Account
│
├── /education/                ★ 교육 콘텐츠 Hub
│   ├── what-is-pomodoro/      (개념 설명)
│   ├── how-to-use/            (실행 가이드)
│   ├── why-it-works/          (과학적 근거)
│   │
│   └── /guides/               (실전 가이드)
│       ├── for-students/
│       ├── for-developers/
│       ├── avoid-distractions/
│       └── vs-timeboxing/
│
├── /resources/                ★ 참고 자료
│   ├── pomodoro-history/
│   ├── science-of-focus/
│   └── case-studies/
│
├── /help/                      ★ 지원 센터
│   ├── faq/
│   ├── contact/
│   └── troubleshooting/
│
├── /company/                   회사 정보
│   ├── about/
│   └── open-source/
│
└── /legal/                     법률
    ├── privacy/
    ├── terms/
    └── contact/
```

**개선 효과**:
- Content Silo 명확화 (+15% authority)
- 계층 구조 강화 (5단계)
- 사용자 네비게이션 개선

---

## 2. 헤더 계층 구조 블루프린트

### 2.1 What is Pomodoro 페이지 (현재)

```
┌─────────────────────────────────────────────────┐
│ H1: What is the Pomodoro Technique?             │ ← 메인 주제
└─────────────────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: The Problem & Solution            │ ← 도입
    │    └───────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: How to Use Pomodoro               │
    │    ├── (Step 1: Choose a Task)           ← 개선: H3 추가
    │    ├── (Step 2: Set Timer)
    │    ├── (Step 3: Work with Focus)
    │    ├── (Step 4: Take a Break)
    │    └── (Step 5: Repeat & Rest)
    │    └───────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: Why It Works                      │
    │    ├── (Benefit 1: Fights Procrastination)│ ← 개선: H3 추가
    │    ├── (Benefit 2: Improves Focus)
    │    ├── (Benefit 3: Prevents Burnout)
    │    └── (Benefit 4: Builds Momentum)
    │    └───────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: Best Practices                    │ ← 6개 항목
    │    └───────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: Common Mistakes                   │ ← 4개 항목
    │    └───────────────────────────────────────┘
    │
    ├─── ┌───────────────────────────────────────┐
    │    │ H2: Built for Deep Work               │ ← 제품 기능
    │    └───────────────────────────────────────┘
    │
    └─── ┌───────────────────────────────────────┐
         │ H2: Frequently Asked Questions        │
         └───────────────────────────────────────┘
```

**평가**: ★★★★☆ (4/5) - 좋음, H3 강화 필요

---

### 2.2 FAQ 페이지 (개선 전/후)

#### 현재 상태
```
H1: Pomobox FAQ
├── H2: App Features
│   ├── Q: What features...        ← 문제: H3 없음
│   ├── Q: Can I customize...
│   ├── Q: How does BGM...
│   └── ...
├── H2: Technical & Data
├── H2: Productivity Tips
└── H2: Account & Support
```

#### 개선 안
```
H1: Pomobox FAQ
├── H2: App Features (Category)
│   ├── H3: What features does Pomobox include?
│   ├── H3: Can I customize the timer duration?
│   ├── H3: How does the BGM feature work?
│   └── ...
├── H2: Technical & Data (Category)
│   ├── H3: Does Pomobox work offline?
│   └── ...
├── H2: Productivity Tips
│   ├── H3: How many pomodoros should I aim for daily?
│   └── ...
└── H2: Account & Support
    ├── H3: Do I need an account to use Pomobox?
    └── ...
```

**기대 효과**:
- Featured Snippet 획득률 +5~10%
- SERP 가독성 개선
- 스키마 마크업 명확화

---

## 3. Content Silo 구조 (주제별 클러스터링)

### 3.1 Silo 1: 핵심 Pomodoro 이해

```
Silo: "Pomodoro Technique Understanding"
      ↓
┌─────────────────────────────────────────────┐
│ HUB: /education/what-is-pomodoro/           │
│ (Central authority: 모든 신호 수렴)         │
└─────────────────────────────────────────────┘
      ↓
   ┌──┴──┬──────────┬──────────┐
   ↓     ↓          ↓          ↓
┌──────────────┐┌──────────┐┌─────────┐┌──────────┐
│ PILLAR 1:    ││PILLAR 2: ││PILLAR 3:││PILLAR 4:│
│How to Use    ││Why Works ││Benefits ││History  │
│             ││          ││         ││         │
│[Internal    ││[Link to  ││[Link to ││[Link to │
│link ↔ Hub]  ││Hub]      ││Hub]     ││Hub]     │
└──────────────┘└──────────┘└─────────┘└──────────┘
      │              │          │          │
      ↓              ↓          ↓          ↓
   (5단계)     (4개 과학적  (심리학  (역사적
               원리)      배경)   배경)
```

**Link Flow**:
```
Hub ↔ Pillar 1
 ↔ Pillar 2
 ↔ Pillar 3
 ↔ Pillar 4

Pillar 1 ↔ Pillar 2 (선택적)
```

---

### 3.2 Silo 2: 응용 가이드

```
Silo: "Pomodoro Applications"
      ↓
┌──────────────────────────────────────────┐
│ HUB: /education/guides/               │
│ (Overview: 모든 가이드의 진입점)      │
└──────────────────────────────────────────┘
      ↓
   ┌──┬────────┬────────────┬──────────┐
   ↓  ↓        ↓            ↓          ↓
┌─────────┐┌─────────┐┌────────────┐┌──────────┐
│For       ││For      ││For         ││Avoiding  │
│Students  ││Devs     ││Managers    ││Distract. │
│          ││         ││            ││          │
│[Subject- ││[Lang-   ││[Meeting    ││[Tools,   │
│specific] ││specific]││deep work]  ││habits]   │
└─────────┘└─────────┘└────────────┘└──────────┘
     ↓
 (각각 Hub로 링크)
```

---

## 4. Breadcrumb 구현 규약

### 4.1 Breadcrumb URL 맵핑

```
페이지 URL                               Breadcrumb
─────────────────────────────────────────────────────────────
/                                        (없음 또는 Home)
/education/what-is-pomodoro/             Home > Education > What is Pomodoro
/education/guides/for-students/          Home > Education > Guides > For Students
/help/faq/                               Home > Help > FAQ
/about/                                  Home > About
/resources/pomodoro-history/             Home > Resources > Pomodoro History
```

### 4.2 Breadcrumb 컴포넌트 구현

```tsx
// BreadcrumbGenerator 유틸
const breadcrumbMap = {
  "": { label: "Home", href: "/" },
  "education": { label: "Education" },
  "what-is-pomodoro": { label: "What is Pomodoro?" },
  "guides": { label: "Guides" },
  "for-students": { label: "For Students" },
  "for-developers": { label: "For Developers" },
  "help": { label: "Help" },
  "faq": { label: "FAQ" },
  "about": { label: "About" },
  "resources": { label: "Resources" },
  "pomodoro-history": { label: "Pomodoro History" },
}

export function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = [
    { label: "Home", href: "/" }
  ]

  let currentPath = ""
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === segments.length - 1
    const label = breadcrumbMap[segment]?.label || segment

    if (isLast) {
      breadcrumbs.push({ label })
    } else {
      breadcrumbs.push({
        label,
        href: breadcrumbMap[segment]?.href || currentPath
      })
    }
  })

  return breadcrumbs
}
```

---

## 5. Table of Contents (TOC) 구조

### 5.1 What is Pomodoro 페이지 TOC

```
┌────────────────────────────────────┐
│  ON THIS PAGE                      │
├────────────────────────────────────┤
│  1. What is the Pomodoro? ────────>│
│  2. How to Use Pomodoro ──────────>│
│     • Step 1: Choose a Task       │
│     • Step 2: Set Timer           │
│     • Step 3: Work with Focus     │
│     • Step 4: Take a Break        │
│     • Step 5: Repeat & Rest       │
│  3. Why It Works ─────────────────>│
│     • Fights Procrastination      │
│     • Improves Focus              │
│     • Prevents Burnout            │
│     • Builds Momentum             │
│  4. Best Practices ───────────────>│
│  5. Common Mistakes ──────────────>│
│  6. Pomobox Features ─────────────>│
│  7. FAQ ──────────────────────────>│
└────────────────────────────────────┘
```

### 5.2 FAQ 페이지 TOC

```
┌────────────────────────────────────┐
│  HELP CENTER                       │
├────────────────────────────────────┤
│  App Features ────────────────────>│
│  Technical & Data ────────────────>│
│  Productivity Tips ───────────────>│
│  Account & Support ──────────────>│
│  Learn More ──────────────────────>│
└────────────────────────────────────┘
```

---

## 6. 내부 링크 전략 (Interlinking Matrix)

### 6.1 링크 흐름 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                    HOME (/)                              │
│        (Hub of all internal links)                       │
└────────────────┬────────────────────────────────────────┘
                 │
         ┌───────┼────────┐
         ↓       ↓        ↓
    ┌────────┐ ┌────┐ ┌──────┐
    │Timer   │ │FAQs│ │Guide │
    └───┬────┘ └─┬──┘ └──┬───┘
        │        │       │
        │        ↓       ↓
        │    ┌─────────────────────┐
        │    │ What is Pomodoro?   │ ← Hub Article
        │    │ (Main Guide)        │
        │    └─────────────────────┘
        │      ↓   ↓   ↓   ↓
        │    ┌──┬──┬──┬──┐
        │    ↓  ↓  ↓  ↓  ↓
        └────→ For      For  Avoid  vs
             Students  Devs  Distr. Time
                              boxing

┌─────────────────────────────────────────┐
│ About  →  Why Pomobox  →  Guide        │
│                          ↓              │
│                      FAQ  ←─────→  All │
└─────────────────────────────────────────┘
```

### 6.2 링크 매트릭스

| From Page | To Page | Link Type | Anchor Text |
|-----------|---------|-----------|-------------|
| FAQ | What is Pomodoro | Related | "Read the complete guide" |
| For Students | For Developers | Series | "Next: For Developers →" |
| For Developers | For Students | Series | "← Previous: For Students" |
| About | What is Pomodoro | Feature | "Learn how Pomodoro works" |
| What is Pomodoro | FAQ | Jump | "See answers to common Q" |
| Home | Guide | Primary | "Learn Pomodoro Technique" |
| Guide | Resources | Related | "Dive into the science" |

---

## 7. 스키마 마크업 구조 트리

### 7.1 현재 구현

```
root/layout.tsx
└── <script type="application/ld+json">
    └── WebApplication
        ├── name: "Pomobox"
        ├── applicationCategory: "ProductivityApplication"
        ├── offers: { price: "0" }
        └── featureList: [...]

what-is-pomodoro/page.tsx
└── <script type="application/ld+json">
    ├── Article
    │   ├── headline
    │   ├── author: Organization
    │   ├── publisher: Organization
    │   ├── datePublished
    │   └── dateModified
    │
    └── FAQPage
        └── mainEntity: Question[]
            ├── name
            └── acceptedAnswer: Answer
                └── text
```

### 7.2 권장 추가 마크업

```
all pages
├── BreadcrumbList ★★★ (높은 우선순위)
│   ├── position
│   ├── name
│   └── item (URL)
│
what-is-pomodoro
├── HowTo ★★★
│   ├── step[]
│   │   ├── position
│   │   ├── name
│   │   └── text
│   └── image
│
about
├── Organization ★★
│   ├── name
│   ├── url
│   ├── description
│   ├── logo
│   └── sameAs (GitHub)
│
articles (blog)
├── NewsArticle ★
│   ├── headline
│   ├── author
│   ├── datePublished
│   └── articleBody

resources
└── Thing ★ (향후)
    ├── name
    ├── description
    └── url
```

---

## 8. 이미지 최적화 배치도

### 8.1 권장 이미지 삽입 위치

```
What is Pomodoro Page
│
├── Hero Section
│   └── [이미지 1] Pomodoro Cycle Diagram
│       - 25min Focus → 5min Break → Repeat
│       - 크기: 1000x1000px (SVG)
│       - Alt: "Pomodoro 25-5 cycle visualization"
│
├── How to Use Section
│   ├── [이미지 2] Step-by-Step Infographic
│   │   - 5개 단계를 이미지로
│   │   - 크기: 1200x600px
│   │   - Alt: "Five steps of the Pomodoro Technique"
│   │
│   └── [이미지 3] Timeline Chart
│       - 하루 일정 + Pomodoro 적용 예시
│       - 크기: 1200x400px
│
├── Why It Works Section
│   └── [이미지 4] Brain Science Infographic
│       - 집중력 뇌파, 도파민 릴리스
│       - 크기: 1000x800px
│
├── Best Practices Section
│   └── [이미지 5] Best Practices Checklist
│       - 6가지 practice 아이콘 + 체크
│       - 크기: 1200x400px
│
└── FAQ Section
    └── [이미지 6] Comparison Chart
        - Pomodoro vs 다른 기법
        - 크기: 1000x600px (테이블 형식)

About Page
│
├── Hero
│   └── [이미지 7] App Screenshot
│       - 타이머 UI 모습
│       - 크기: 1200x800px
│
└── Features
    ├── [이미지 8] Dashboard Screenshot
    ├── [이미지 9] Calendar Heatmap
    └── [이미지 10] Statistics Chart
```

---

## 9. URL 구조 마이그레이션 플로우

### 9.1 단계별 URL 변경

```
Phase 1: 새 URL 구조 생성 (모두 라이브)

/education/
├── what-is-pomodoro/           (기존 /guide/what-is-pomodoro)
├── how-to-use-pomodoro/        (신규)
├── why-pomodoro-works/         (신규 - 현재 "Why It Works"에서)
│
└── /guides/
    ├── for-students/           (기존 /guide/pomodoro-for-students)
    ├── for-developers/         (기존 /guide/pomodoro-for-developers)
    ├── avoid-distractions/     (기존 /guide/how-to-avoid-distractions)
    └── vs-timeboxing/          (기존 /guide/pomodoro-vs-timeboxing)

/resources/
├── pomodoro-history/           (기존 /blog/pomodoro-history)
└── science-of-focus/           (기존 /blog/science-of-focus)

/help/
├── faq/                        (기존 /faq)
└── contact/                    (기존 /contact)

Phase 2: 301 리다이렉트 설정

/guide/what-is-pomodoro → /education/what-is-pomodoro
/guide/pomodoro-for-students → /education/guides/for-students
/blog/pomodoro-history → /resources/pomodoro-history
/faq → /help/faq

Phase 3: 6개월 후 리다이렉트 제거
```

---

## 10. 모니터링 대시보드 (KPI)

### 10.1 SEO 메트릭

```
┌─────────────────────────────────────────────────┐
│ MONTHLY SEO METRICS                             │
├─────────────────────────────────────────────────┤
│                                                 │
│ 검색 노출수 (Impressions)                       │
│ ═════════════════════════                       │
│ Current: ?     Target: ? (+30%)                 │
│ Trend:   📈    (month-over-month)               │
│                                                 │
│ CTR (Click-Through Rate)                        │
│ ═════════════════════════                       │
│ Current: ?     Target: ? (+10%)                 │
│ Contribution: Breadcrumb (+3%)                  │
│              Featured Snippet (+2%)             │
│              Better titles (+5%)                │
│                                                 │
│ Featured Snippets Acquired                      │
│ ═════════════════════════════                   │
│ Current: 0     Target: 3-5 (within 3mo)         │
│ Targets:                                        │
│  ☐ "What is Pomodoro?" (Definition)             │
│  ☐ "5 steps of Pomodoro" (List)                 │
│  ☐ "How many pomodoros per day?" (Answer)       │
│  ☐ "Pomodoro vs Timeboxing" (Table)             │
│  ☐ One more from FAQ                            │
│                                                 │
│ Average Position                                │
│ ═════════════════════════════                   │
│ Current: ? Target: Top 5 (priority keywords)    │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 10.2 사용자 행동 메트릭

```
┌──────────────────────────────────────┐
│ USER ENGAGEMENT METRICS              │
├──────────────────────────────────────┤
│ Avg. Scroll Depth                    │
│ Current: 60%  Target: 80%             │
│ (After TOC implementation)            │
│                                       │
│ Pages Per Session                    │
│ Current: ?    Target: 2.5+            │
│ (After interlinking)                  │
│                                       │
│ Bounce Rate                          │
│ Current: ?    Target: -5%             │
│                                       │
│ Time on Page                         │
│ Current: ?    Target: +15%            │
│ (After TOC + breadcrumb)              │
│                                       │
│ Internal Link Clicks                 │
│ Target: +20% (after network expand)   │
│                                       │
│ Guide Series Completion Rate         │
│ Target: 30% complete all guides       │
│                                       │
└──────────────────────────────────────┘
```

---

## 11. 구현 체크리스트 (Detailed)

### Phase 1: Foundations (Week 1-2)

#### Week 1
- [ ] Breadcrumb 컴포넌트 개발
  - [ ] TypeScript 타입 정의
  - [ ] Schema 마크업 생성 함수
  - [ ] 스타일링 (모바일 반응형)
  - [ ] 테스트
- [ ] Breadcrumb를 모든 가이드 페이지에 추가
  - [ ] /guide/what-is-pomodoro
  - [ ] /guide/pomodoro-for-students
  - [ ] /guide/pomodoro-for-developers
  - [ ] /guide/how-to-avoid-distractions
  - [ ] /guide/pomodoro-vs-timeboxing
  - [ ] /about
  - [ ] /faq
- [ ] FAQ 페이지 H3 마크업 추가
  - [ ] App Features 섹션 (6개 질문)
  - [ ] Technical & Data (7개 질문)
  - [ ] Productivity Tips (8개 질문)
  - [ ] Account & Support (5개 질문)

#### Week 2
- [ ] 정의 박스 섹션 생성 (What is Pomodoro)
  - [ ] 디자인 설계
  - [ ] 컴포넌트 개발
  - [ ] 스타일 적용
- [ ] HowTo 스키마 구현
  - [ ] 5-step process JSON-LD 생성
  - [ ] 검증 (Google's Structured Data Tester)
- [ ] pnpm lint && pnpm build 검증
- [ ] 모니터링 시작

### Phase 2: Enhancement (Week 3-4)

#### Week 3
- [ ] TOC 컴포넌트 개발
  - [ ] 자동 섹션 감지 기능
  - [ ] Jump link 생성
  - [ ] 반응형 스타일
- [ ] What is Pomodoro에 TOC 추가
- [ ] 가이드 시리즈 네비게이션 추가
  - [ ] Footer "Previous/Next" 버튼
  - [ ] GUIDE_SEQUENCE 배열 정의
  - [ ] 모든 guide 페이지 업데이트

#### Week 4
- [ ] 이미지 리소스 제작 (또는 디자이너 협력)
  - [ ] Pomodoro cycle diagram (SVG)
  - [ ] 5-step infographic
  - [ ] Brain science visualization
  - [ ] Comparison chart
- [ ] 이미지 삽입 (최우선 페이지)
  - [ ] What is Pomodoro (2개)
  - [ ] About (1개)
- [ ] Next.js Image 최적화 설정
  - [ ] Lazy loading
  - [ ] WebP conversion
  - [ ] Responsive sizes

### Phase 3: Scale-up (Week 5-6)

- [ ] Organization 스키마 추가 (About)
- [ ] 가이드 간 상호 링크 확대
- [ ] FAQ 답변 내 더 깊은 링크 추가
- [ ] 추가 이미지 삽입 (나머지)
- [ ] URL 구조 변경 검토 (선택사항)

---

## 12. 수정 전/후 코드 예시

### 12.1 FAQ 페이지 (H3 추가)

#### Before
```tsx
{category.faqs.map((faq) => (
  <details key={faq.question}>
    <summary className="font-medium text-foreground pr-4">
      {faq.question}
    </summary>
    <p className="mt-4 text-sm text-muted-foreground">
      {faq.answer}
    </p>
  </details>
))}
```

#### After
```tsx
{category.faqs.map((faq) => (
  <details
    key={faq.question}
    className="group p-4 md:p-5 rounded-2xl bg-card/60 dark:bg-card/40 border border-border/50 hover:border-primary/30 transition-colors"
  >
    <summary className="flex items-center justify-between cursor-pointer list-none">
      <h3 className="font-medium text-foreground pr-4">
        {faq.question}
      </h3>
      <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
    </summary>
    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
      {faq.answer}
    </p>
  </details>
))}
```

**변경사항**:
- `<h3>` 태그로 각 질문 감싸기
- 의미론적 HTML 강화
- Featured Snippet 가능성 증대

---

## 13. 성공 지표 예시

### 13.1 1개월 후 예상 결과

```
메트릭                    현재        목표        성공 여부
──────────────────────────────────────────────
Breadcrumb 표시        0/10 pages  10/10 pages  ✓ 완료
H3 마크업 추가         미완료      FAQ 완료     ✓ 완료
HowTo 스키마           없음        1개          ✓ 완료
Featured Snippet       0~1개       2~3개        ? 추적 중
CTR 증가                0%          +3~5%        ? 추적 중
```

### 13.2 3개월 후 예상 결과

```
유기 트래픽 증가:        +30% (Breadcrumb, 내부 링크)
Featured Snippet:       3~5개 획득
검색 노출도:            +40%
평균 순위:              현재 → Top 5 (priority KW)
사용자 참여:
  - 페이지 체류:        +15%
  - 스크롤 깊이:        60% → 80%
  - 이탈률:             -5%
도메인 권한:            +2~3 포인트
```

---

## 14. 리스크 및 완화 전략

### 14.1 잠재 리스크

| 리스크 | 영향도 | 확률 | 완화 전략 |
|--------|--------|------|---------|
| URL 변경 시 traffic loss | 높음 | 중 | 301 리다이렉트 미리 설정 |
| 스키마 검증 실패 | 중 | 낮음 | Google's Tester로 사전 확인 |
| 이미지 로딩 느림 | 중 | 중 | Next.js Image + WebP |
| Breadcrumb 스타일 깨짐 | 낮음 | 낮음 | 테스트 (모바일 포함) |
| H3 추가로 레이아웃 변경 | 낮음 | 낮음 | CSS class명 유지 |

---

**작성**: Claude Code / SEO 콘텐츠 구조 전문가
**버전**: v1.0 - 2025년 1월 5일
