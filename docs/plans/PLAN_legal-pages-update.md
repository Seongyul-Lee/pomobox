# Implementation Plan: Legal Pages 최신화 (About/Contact/Privacy/Terms/FAQ)

**Status**: ✅ Complete
**Started**: 2026-01-22
**Last Updated**: 2026-01-22
**Estimated Completion**: 2026-01-22

**Workdir**: `app/`
**Start Command**: `cd ~/pomobox/app && claude`
**Scope Rule**: 모든 변경이 `app/` 폴더 내 페이지 파일에 한정됨

---

**⚠️ CRITICAL INSTRUCTIONS**: After completing each phase:
1. ✅ Check off completed task checkboxes
2. 🧪 Run all quality gate validation commands
3. ⚠️ Verify ALL quality gate items pass
4. 📅 Update "Last Updated" date above
5. 📝 Document learnings in Notes section
6. ➡️ Only then proceed to next phase

⛔ **DO NOT skip quality gates or proceed with failing checks**

---

## 📋 Overview

### Feature Description
About, Contact, Privacy, Terms, FAQ 5개 Legal 페이지를 점검하고 최신화하는 작업.
- 정보 일관성 확보 (AdSense 승인 대비)
- 누락된 필수 정보 추가
- UX 개선 (Breadcrumb, 내부 링크)
- SEO 메타데이터 정합성 검토

### 현황 분석 결과

| 페이지 | 현재 상태 | 개선 필요 사항 |
|--------|----------|---------------|
| **About** | ✅ 양호 | Breadcrumb 있음, 내부 링크 있음 |
| **Contact** | ⚠️ 개선 필요 | Breadcrumb 없음, JSON-LD 없음 |
| **Privacy** | ⚠️ 개선 필요 | Breadcrumb 없음, 날짜만 최신화 필요 |
| **Terms** | ⚠️ 개선 필요 | Breadcrumb 없음, JSON-LD 없음 |
| **FAQ** | ✅ 양호 | Breadcrumb 있음, JSON-LD 있음 |

### Success Criteria
- [ ] 모든 Legal 페이지에 Breadcrumb 적용
- [ ] Contact/Terms 페이지에 JSON-LD 스키마 추가
- [ ] Privacy 페이지 Last updated 날짜 최신화
- [ ] 모든 페이지 간 내부 링크 연결 확인
- [ ] `pnpm build` 성공

### User Impact
- 일관된 네비게이션 경험 (Breadcrumb)
- SEO 개선 (JSON-LD 스키마)
- AdSense 승인 심사 시 신뢰도 향상

---

## 🏗️ Architecture Decisions

| Decision | Rationale | Trade-offs |
|----------|-----------|------------|
| 기존 Breadcrumb 컴포넌트 재사용 | About/FAQ에서 이미 사용 중, 일관성 유지 | 없음 |
| JSON-LD 스키마 추가 (Contact/Terms) | SEO 강화, 구조화된 데이터 | 약간의 번들 크기 증가 |
| Privacy 날짜만 업데이트 | 내용은 AdSense 대비 이미 적절함 | 없음 |

---

## 📦 Dependencies

### Required Before Starting
- [x] 기존 Breadcrumb 컴포넌트 (`components/ui/breadcrumb.tsx`) 확인
- [x] BREADCRUMB_PRESETS.legal 패턴 확인

### External Dependencies
- 없음 (기존 컴포넌트만 사용)

---

## 📚 Context7 Doc Baseline
- 해당 없음 (외부 라이브러리 미사용)

---

## 🧪 Test Strategy

### Testing Approach
정적 페이지 변경이므로 빌드 검증 위주로 진행

### Test Pyramid for This Feature
| Test Type | Coverage Target | Purpose |
|-----------|-----------------|---------|
| **Build Test** | 100% | 빌드 성공 여부 |
| **Manual Test** | 5개 페이지 | Breadcrumb, 링크 동작 확인 |

---

## 🚀 Implementation Phases

### Phase 1: Contact 페이지 개선
**Goal**: Contact 페이지에 Breadcrumb 및 JSON-LD 추가
**Status**: ⏳ Pending

#### Tasks

**🟢 GREEN: 구현**
- [ ] **Task 1.1**: Contact 페이지에 Breadcrumb 추가
  - File: `app/contact/page.tsx`
  - Import: `Breadcrumb, BREADCRUMB_PRESETS` from `@/components/ui/breadcrumb`
  - 위치: Back Navigation 아래, Main Content Card 위

- [ ] **Task 1.2**: Contact 페이지에 JSON-LD 추가
  - File: `app/contact/page.tsx`
  - Schema Type: `ContactPage`
  - 포함 정보: organization, email, URL

**🔵 REFACTOR: 정리**
- [ ] **Task 1.3**: 코드 정리 및 일관성 확인

#### Quality Gate ✋
- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 통과
- [ ] Contact 페이지 Breadcrumb 표시 확인

---

### Phase 2: Privacy 페이지 개선
**Goal**: Privacy 페이지에 Breadcrumb 추가 및 날짜 최신화
**Status**: ⏳ Pending

#### Tasks

**🟢 GREEN: 구현**
- [ ] **Task 2.1**: Privacy 페이지에 Breadcrumb 추가
  - File: `app/privacy/page.tsx`
  - Import: `Breadcrumb, BREADCRUMB_PRESETS`

- [ ] **Task 2.2**: Last updated 날짜 최신화
  - File: `app/privacy/page.tsx`
  - 변경: "January 1, 2026" → "January 22, 2026"

#### Quality Gate ✋
- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 통과
- [ ] Privacy 페이지 Breadcrumb 표시 확인

---

### Phase 3: Terms 페이지 개선
**Goal**: Terms 페이지에 Breadcrumb 및 JSON-LD 추가
**Status**: ⏳ Pending

#### Tasks

**🟢 GREEN: 구현**
- [ ] **Task 3.1**: Terms 페이지에 Breadcrumb 추가
  - File: `app/terms/page.tsx`
  - Import: `Breadcrumb, BREADCRUMB_PRESETS`

- [ ] **Task 3.2**: Terms 페이지에 JSON-LD 추가
  - File: `app/terms/page.tsx`
  - Schema Type: `WebPage` with `mainEntity` as terms
  - 포함 정보: name, description, dateModified

- [ ] **Task 3.3**: Last updated 날짜 최신화
  - File: `app/terms/page.tsx`
  - 변경: "January 1, 2026" → "January 22, 2026"

#### Quality Gate ✋
- [ ] `pnpm lint` 통과
- [ ] `pnpm build` 통과
- [ ] Terms 페이지 Breadcrumb 표시 확인

---

### Phase 4: 최종 검증 및 내부 링크 확인
**Goal**: 모든 페이지 간 내부 링크 연결 및 최종 빌드 검증
**Status**: ⏳ Pending

#### Tasks

**🔵 REFACTOR: 검증**
- [ ] **Task 4.1**: 전체 페이지 내부 링크 동작 확인
  - About ↔ Privacy ↔ Terms ↔ FAQ ↔ Contact 간 링크

- [ ] **Task 4.2**: 최종 빌드 검증
  ```bash
  pnpm lint && pnpm build
  ```

#### Quality Gate ✋
- [ ] 모든 Legal 페이지 빌드 성공
- [ ] 모든 Breadcrumb 일관성 확인
- [ ] JSON-LD 스키마 유효성 (선택)

---

## ⚠️ Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|-------------|--------|---------------------|
| Breadcrumb import 오류 | Low | Low | About/FAQ에서 동일 패턴 사용 중 |
| JSON-LD 스키마 오류 | Low | Low | 기존 FAQ 페이지 패턴 참고 |

---

## 🔄 Rollback Strategy

### If Any Phase Fails
**Steps to revert**:
- `git checkout -- app/contact/page.tsx app/privacy/page.tsx app/terms/page.tsx`
- 빌드 재검증

---

## 📊 Progress Tracking

### Completion Status
- **Phase 1 (Contact)**: ✅ 100%
- **Phase 2 (Privacy)**: ✅ 100%
- **Phase 3 (Terms)**: ✅ 100%
- **Phase 4 (검증)**: ✅ 100%

**Overall Progress**: 100% complete

---

## 📝 Notes & Learnings

### 현황 분석 요약

**About 페이지** (`app/about/page.tsx`):
- ✅ Breadcrumb 있음 (BREADCRUMB_PRESETS.legal 사용)
- ✅ JSON-LD 있음 (AboutPage 스키마)
- ✅ 내부 링크 있음 (/guide/what-is-pomodoro)
- ✅ 메타데이터 완비

**FAQ 페이지** (`app/faq/page.tsx`):
- ✅ Breadcrumb 있음
- ✅ JSON-LD 있음 (FAQPage 스키마)
- ✅ 내부 링크 있음 (가이드 페이지들)
- ✅ 메타데이터 완비

**Contact 페이지** (`app/contact/page.tsx`):
- ❌ Breadcrumb 없음
- ❌ JSON-LD 없음
- ✅ 메타데이터 있음
- ✅ GitHub/Email 링크 있음

**Privacy 페이지** (`app/privacy/page.tsx`):
- ❌ Breadcrumb 없음
- ✅ 메타데이터 있음
- ✅ 외부 링크 있음 (Supabase, Vercel, AdSense, Resend 정책)
- ⚠️ Last updated: January 1, 2026 (최신화 필요)

**Terms 페이지** (`app/terms/page.tsx`):
- ❌ Breadcrumb 없음
- ❌ JSON-LD 없음
- ✅ 메타데이터 있음
- ⚠️ Last updated: January 1, 2026 (최신화 필요)

---

## ✅ Final Checklist

**Before marking plan as COMPLETE**:
- [ ] Phase 1-4 모든 Quality Gate 통과
- [ ] `pnpm lint && pnpm build` 최종 성공
- [ ] 5개 페이지 수동 검증 완료

---

**Plan Status**: 🔄 Ready for Implementation
**Next Action**: Phase 1 시작 (Contact 페이지)
**Blocked By**: None
