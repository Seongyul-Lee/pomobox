# 📝 콘텐츠 확장 계획: 14개 가이드/블로그 페이지

> **목적**: 애드센스 승인을 위한 양질의 콘텐츠 확보 (19개 → 33개)
> **생성일**: 2025-01-13
> **상태**: ✅ 완료

---

## 📌 공통 설정

| 항목 | 값 |
|------|-----|
| YMYL 여부 | No (생산성 도구, 비 YMYL) |
| SEO 워크플로우 | 2단계 (`keyword-strategist` → `meta-optimizer` + `structure-architect`) |
| UI 언어 | 영어 |
| 코드 주석 | 한글 |
| 가이드 패턴 참조 | `app/guide/pomodoro-for-developers/page.tsx` |
| 블로그 패턴 참조 | `app/blog/deep-work-method/page.tsx` |

---

## 🎨 글 구조 유형 정의

| 유형 | 특징 | 주요 섹션 구성 |
|------|------|---------------|
| **A. 스토리텔링형** | 실제 사례/여정 중심, 감정적 연결 | 도입 스토리 → 문제 발견 → 해결 과정 → 교훈 → 적용 방법 |
| **B. 리스트형** | 핵심 포인트 나열, 스캔 용이 | 개요 → N가지 방법/팁 (번호 매김) → 요약 → CTA |
| **C. 비교 분석형** | 두 개념 대조, 객관적 판단 지원 | 개요 → 각 개념 설명 → 비교 테이블 → 상황별 추천 → 결론 |
| **D. 심층 연구형** | 학술 연구 인용, 전문성 강조 | 핵심 발견 → 연구 근거 (인용) → 메커니즘 설명 → 실용적 적용 → 참고문헌 |
| **E. 단계별 가이드형** | 실행 순서 명확, 따라하기 쉬움 | 준비물/전제조건 → Step 1~N → 주의사항 → 다음 단계 |
| **F. 문제-해결형** | 문제 공감 → 원인 → 해결책 | 문제 상황 묘사 → 왜 발생하는가 → 해결 전략 → 예방법 |
| **G. Q&A 확장형** | 질문 중심, 검색 의도 직접 답변 | 핵심 질문 답변 → 관련 질문들 → 심화 설명 → FAQ 섹션 |
| **H. 사례 연구형** | 실제 인물/기업 사례 중심 | 배경 소개 → 도전 과제 → 적용 방법 → 결과 → 배울 점 |

---

## 🗂️ Part 1: 가이드 페이지 (5개)

### #1. pomodoro-for-writers

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅱️ **리스트형** + 사례 삽입 |
| **주제** | 작가/글쓰기 종사자를 위한 포모도로 |
| **타겟 키워드** | pomodoro for writers, writing productivity, focus for writing |
| **페이지 경로** | `/guide/pomodoro-for-writers` |

**구조 예시**:
- "작가를 위한 7가지 포모도로 전략"
- 각 전략에 짧은 작가 인용/사례 포함
- 글쓰기 유형별 체크리스트로 마무리

**콘텐츠 방향**:
- 글쓰기 유형별 세션 길이 (초고 작성 45분, 편집 25분)
- Writer's block 극복 전략
- 출판 작가/블로거/카피라이터별 팁
- Interactive: 글쓰기 목표 계산기

---

### #2. pomodoro-for-designers

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅴 **단계별 가이드형** |
| **주제** | 디자이너/크리에이터를 위한 포모도로 |
| **타겟 키워드** | pomodoro for designers, creative productivity, design focus |
| **페이지 경로** | `/guide/pomodoro-for-designers` |

**구조 예시**:
- "디자인 프로젝트에 포모도로 적용하는 5단계"
- Step 1: 작업 분류 → Step 2: 세션 설계 → ...
- 각 단계에 Figma/디자인 도구 연동 팁

**콘텐츠 방향**:
- 창의적 작업 vs 실행 작업 구분
- Figma/Sketch 세션 최적화
- 클라이언트 피드백 처리 전략
- Interactive: 프로젝트 포모도로 추정기

---

### #3. pomodoro-for-managers

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅵 **문제-해결형** |
| **주제** | 매니저/리더를 위한 포모도로 |
| **타겟 키워드** | pomodoro for managers, meeting management, leadership productivity |
| **페이지 경로** | `/guide/pomodoro-for-managers` |

**구조 예시**:
- 문제: "하루 종일 미팅인데 언제 일하죠?"
- 원인: 매니저 역할의 구조적 특성
- 해결: No Meeting Zone, 위임 전략, 미팅 배칭

**콘텐츠 방향**:
- 미팅 중심 환경에서 포모도로 활용
- "No Meeting Zone" 설정 전략
- 1:1 미팅 + 포모도로 통합
- 팀원에게 포모도로 문화 전파 방법

---

### #4. pomodoro-for-freelancers

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅷 **사례 연구형** |
| **주제** | 프리랜서를 위한 포모도로 |
| **타겟 키워드** | pomodoro for freelancers, freelance productivity, time tracking billing |
| **페이지 경로** | `/guide/pomodoro-for-freelancers` |

**구조 예시**:
- 3명의 프리랜서 사례 (개발자, 디자이너, 작가)
- 각자의 도전 → 포모도로 적용 → 결과
- 공통 교훈 도출

**콘텐츠 방향**:
- 포모도로 기반 청구 시간 추적
- 다중 클라이언트 관리
- 자기 동기 부여 전략
- Interactive: 시급/프로젝트 비용 계산기

---

### #5. pomodoro-for-entrepreneurs

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅰️ **스토리텔링형** |
| **주제** | 창업자/기업가를 위한 포모도로 |
| **타겟 키워드** | pomodoro for entrepreneurs, startup productivity, founder focus |
| **페이지 경로** | `/guide/pomodoro-for-entrepreneurs` |

**구조 예시**:
- 가상의 창업자 "Alex"의 하루 여정
- 혼란스러운 시작 → 포모도로 발견 → 점진적 개선
- 독자가 공감하며 따라갈 수 있는 내러티브

**콘텐츠 방향**:
- 다양한 역할 전환 관리 (CEO/개발자/영업)
- "Deep Work Day" vs "Shallow Work Day" 구분
- 번아웃 예방
- 실제 창업자 인용/사례

---

## 📰 Part 2: 블로그 페이지 (9개)

### #6. social-media-brain

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅳 **심층 연구형** |
| **주제** | SNS가 뇌에 미치는 영향과 집중력 회복 |
| **타겟 키워드** | social media brain, dopamine detox, attention economy |
| **페이지 경로** | `/blog/social-media-brain` |

**구조 예시**:
- 핵심 연구 결과로 시작 (통계)
- 뇌과학 메커니즘 설명 (도파민 루프)
- 연구 인용 3-4개
- 실용적 적용 방법

**콘텐츠 방향**:
- 도파민 루프와 SNS 중독 메커니즘
- "주의력 경제"의 작동 방식
- 디지털 디톡스 단계별 가이드
- Interactive: SNS 사용 시간 계산기

---

### #7. science-of-breaks

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅶 **Q&A 확장형** |
| **주제** | 휴식의 과학 - 왜 쉬어야 더 많이 할 수 있는가 |
| **타겟 키워드** | science of breaks, rest productivity, micro breaks |
| **페이지 경로** | `/blog/science-of-breaks` |

**구조 예시**:
- "휴식하면 오히려 생산성이 떨어지지 않나요?" (핵심 질문)
- 답변 + 연구 근거
- 관련 질문 5-6개 확장
- FAQ 섹션으로 마무리

**콘텐츠 방향**:
- DMN(Default Mode Network)과 창의성
- 휴식 유형별 효과 (마이크로 브레이크, 산책, 낮잠)
- "휴식 죄책감" 극복하기
- Interactive: 최적 휴식 시간 추천기

---

### #8. sleep-and-productivity

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅵 **문제-해결형** |
| **주제** | 수면과 생산성 - 잠을 줄이면 생산성이 떨어지는 이유 |
| **타겟 키워드** | sleep productivity, sleep deprivation focus, optimal sleep |
| **페이지 경로** | `/blog/sleep-and-productivity` |

**구조 예시**:
- 문제: "잠을 줄여서 더 일하려는데 왜 효율이 떨어질까?"
- 원인: 수면 부족의 인지 기능 영향
- 해결: 수면 위생, 최적 수면 시간, 파워낮잠

**콘텐츠 방향**:
- 수면 부족이 인지 기능에 미치는 영향
- 최적 수면 시간 연구
- 수면 위생 체크리스트
- 낮잠(Power Nap)의 과학

---

### #9. energy-management-not-time

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅲 **비교 분석형** |
| **주제** | 시간 관리보다 에너지 관리가 중요한 이유 |
| **타겟 키워드** | energy management, productivity energy, peak performance timing |
| **페이지 경로** | `/blog/energy-management-not-time` |

**구조 예시**:
- 시간 관리 vs 에너지 관리 비교 테이블
- 각 접근법의 장단점
- 상황별 추천 (어떤 사람에게 뭐가 맞나)
- 통합 전략 제안

**콘텐츠 방향**:
- Tony Schwartz의 "에너지 프로젝트" 개념
- 4가지 에너지 유형 (신체, 감정, 정신, 영적)
- 에너지 감사(Energy Audit) 방법
- Interactive: 일일 에너지 패턴 추적기

---

### #10. ergonomics-for-focus

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅱️ **리스트형** |
| **주제** | 집중을 위한 인체공학 - 자세가 생산성에 미치는 영향 |
| **타겟 키워드** | ergonomics focus, desk setup productivity, posture concentration |
| **페이지 경로** | `/blog/ergonomics-for-focus` |

**구조 예시**:
- "집중력을 높이는 10가지 데스크 설정 팁"
- 번호 매긴 실행 가능한 팁
- 각 팁에 "왜 효과적인지" 짧은 설명

**콘텐츠 방향**:
- 자세와 인지 기능의 관계
- 이상적인 데스크 설정 (모니터 높이, 의자, 조명)
- 스탠딩 데스크의 장단점
- 포모도로 휴식 시 스트레칭 루틴

---

### #11. habit-stacking

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅴 **단계별 가이드형** |
| **주제** | 습관 쌓기 - 작은 습관의 복리 효과 |
| **타겟 키워드** | habit stacking, atomic habits, habit formation |
| **페이지 경로** | `/blog/habit-stacking` |

**구조 예시**:
- "습관 쌓기 4단계 실전 가이드"
- Step 1: 기존 습관 파악 → Step 2: 앵커 선택 → ...
- 각 단계에 예시와 워크시트

**콘텐츠 방향**:
- James Clear의 "Atomic Habits" 핵심 개념
- 습관 쌓기 공식: "X 후에 Y를 한다"
- 포모도로를 습관 앵커로 활용하기
- Interactive: 습관 스택 빌더

---

### #12. productive-procrastination

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅰️ **스토리텔링형** |
| **주제** | 생산적 미루기 - 미루는 본능을 활용하는 법 |
| **타겟 키워드** | productive procrastination, structured procrastination, procrastination hack |
| **페이지 경로** | `/blog/productive-procrastination` |

**구조 예시**:
- John Perry 교수의 에세이 작성 일화로 시작
- 미루기의 심리학 탐험
- 독자의 미루기 경험에 공감
- "역이용" 전략으로 전환

**콘텐츠 방향**:
- John Perry의 "Structured Procrastination" 이론
- 미루기의 심리학 (두려움 vs 완벽주의)
- "2분 룰"과 포모도로의 조합
- 미루기 유형별 대처법

---

### #13. weekly-review-habit

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅷 **사례 연구형** |
| **주제** | 주간 리뷰 습관 - 지속적 개선을 위한 성찰 |
| **타겟 키워드** | weekly review, gtd weekly review, productivity reflection |
| **페이지 경로** | `/blog/weekly-review-habit` |

**구조 예시**:
- 3명의 전문가 주간 리뷰 루틴 소개
- 각자의 템플릿과 질문
- 공통점과 개인화 포인트 분석

**콘텐츠 방향**:
- David Allen의 GTD 주간 리뷰
- 주간 리뷰 질문 템플릿
- 포모도로 통계 활용한 주간 분석
- Interactive: 주간 리뷰 체크리스트

---

### #14. batching-tasks

| 항목 | 내용 |
|------|------|
| **글 구조** | 🅳 **심층 연구형** |
| **주제** | 태스크 배칭 - 비슷한 작업 묶어서 처리하기 |
| **타겟 키워드** | task batching, batch processing productivity, context switching reduction |
| **페이지 경로** | `/blog/batching-tasks` |

**구조 예시**:
- 컨텍스트 스위칭 연구 인용으로 시작
- 배칭의 인지과학적 이점 설명
- 연구 3-4개 인용
- 실용적 배칭 전략으로 마무리

**콘텐츠 방향**:
- 배칭의 과학 (컨텍스트 스위칭 최소화)
- 배칭 가능한 작업 유형 (이메일, 미팅, 관리 업무)
- 포모도로 + 배칭 조합 전략
- Interactive: 일일 작업 배칭 플래너

---

## 📊 글 구조 분배 요약

| 구조 유형 | 적용 페이지 | 개수 |
|----------|------------|------|
| 🅰️ 스토리텔링형 | #5, #12 | 2 |
| 🅱️ 리스트형 | #1, #10 | 2 |
| 🅲 비교 분석형 | #9 | 1 |
| 🅳 심층 연구형 | #6, #14 | 2 |
| 🅴 단계별 가이드형 | #2, #11 | 2 |
| 🅵 문제-해결형 | #3, #8 | 2 |
| 🅶 Q&A 확장형 | #7 | 1 |
| 🅷 사례 연구형 | #4, #13 | 2 |

**총 8가지 구조 유형이 14개 페이지에 고르게 분배됨** ✅

---

## ✅ 진행 상황

| # | 페이지 | 유형 | 구조 | 상태 |
|---|--------|------|------|------|
| 1 | pomodoro-for-writers | Guide | 🅱️ 리스트형 | ✅ 완료 |
| 2 | pomodoro-for-designers | Guide | 🅴 단계별 가이드형 | ✅ 완료 |
| 3 | pomodoro-for-managers | Guide | 🅵 문제-해결형 | ✅ 완료 |
| 4 | pomodoro-for-freelancers | Guide | 🅷 사례 연구형 | ✅ 완료 |
| 5 | pomodoro-for-entrepreneurs | Guide | 🅰️ 스토리텔링형 | ✅ 완료 |
| 6 | social-media-brain | Blog | 🅳 심층 연구형 | ✅ 완료 |
| 7 | science-of-breaks | Blog | 🅶 Q&A 확장형 | ✅ 완료 |
| 8 | sleep-and-productivity | Blog | 🅵 문제-해결형 | ✅ 완료 |
| 9 | energy-management-not-time | Blog | 🅲 비교 분석형 | ✅ 완료 |
| 10 | ergonomics-for-focus | Blog | 🅱️ 리스트형 | ✅ 완료 |
| 11 | habit-stacking | Blog | 🅴 단계별 가이드형 | ✅ 완료 |
| 12 | productive-procrastination | Blog | 🅰️ 스토리텔링형 | ✅ 완료 |
| 13 | weekly-review-habit | Blog | 🅷 사례 연구형 | ✅ 완료 |
| 14 | batching-tasks | Blog | 🅳 심층 연구형 | ✅ 완료 |

---

## 📝 실행 가이드

### 권장 배치 분할

```
세션 1: #1 구현 → 사용자 피드백 → 패턴 확립 ✅ 완료
세션 2: #2-5 구현 (가이드 완료) ✅ 완료
세션 3: #6-10 구현 ✅ 완료
세션 4: #11-14 구현 ✅ 완료
```

### 각 페이지 구현 시 워크플로우

1. **키워드 분석** (선택)
   ```
   /seo-technical-optimization:seo-keyword-strategist
   ```

2. **콘텐츠 작성**
   - 지정된 글 구조 유형 준수 (필수)
   - 기존 패턴 참조하여 page.tsx 생성
   - Interactive 컴포넌트 구현 (필요 시)
   - JSON-LD 스키마 포함

3. **SEO 최적화** (선택)
   ```
   /seo-technical-optimization:seo-meta-optimizer
   /seo-technical-optimization:seo-structure-architect
   ```

4. **빌드 검증**
   ```bash
   pnpm lint && pnpm build
   ```

---

## 🔗 관련 문서

- [CLAUDE.md](../../CLAUDE.md) - 프로젝트 전체 규칙
- [app/CLAUDE.md](../../app/CLAUDE.md) - 앱 라우팅 규칙
- 기존 가이드: `app/guide/pomodoro-for-developers/page.tsx`
- 기존 블로그: `app/blog/deep-work-method/page.tsx`
