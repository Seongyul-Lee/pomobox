# Privacy Policy i18n 구현 계획

## 목표
하드코딩된 Privacy Policy 페이지를 i18n 시스템으로 전환하고, 최신 기능 반영 및 4개 언어 번역 완료

## 변경 사항 요약

### 1. 내용 수정 (3가지)
| 조항 | 기존 | 변경 |
|------|------|------|
| Last updated | December 26, 2024 | January 1, 2026 |
| 2.1 Account Info | Email, Password, Creation date | + Google OAuth (Provider ID, Email, Profile Image) |
| 3. Third-Party | Supabase, Vercel, AdSense | + Resend (이메일 발송 서비스) |
| 9.1 Data Deletion | 이메일 요청 → 30일 내 삭제 | My Account > Delete Account로 즉시 삭제 |

### 2. JSON 구조 (섹션별 객체)
```json
{
  "Privacy": {
    "title": "Privacy Policy",
    "description": "...",
    "lastUpdated": "January 1, 2026",
    "backToHome": "Back to Pomobox",
    "intro": {
      "title": "1. Introduction",
      "content": "..."
    },
    "collection": {
      "title": "2. Information We Collect",
      "accountInfo": { "title": "2.1 Account Information", "content": "...", "items": [...] },
      "activityData": { "title": "2.2 User Activity Data", ... },
      "localStorage": { "title": "2.3 Local Storage", ... },
      "automatic": { "title": "2.4 Automatically Collected", ... },
      "cookies": { "title": "2.5 Cookies", ... }
    },
    "thirdParty": {
      "title": "3. Third-Party Services",
      "supabase": { ... },
      "vercel": { ... },
      "adsense": { ... },
      "resend": { ... }
    },
    "usage": { "title": "4. How We Use Your Information", ... },
    "storage": { "title": "5. Data Storage and Retention", ... },
    "security": { "title": "6. Data Security", ... },
    "gdpr": { "title": "7. Your Rights (GDPR)", ... },
    "ccpa": { "title": "8. Your Rights (CCPA)", ... },
    "deletion": {
      "title": "9. How to Delete Your Data",
      "registered": { "title": "9.1 Registered Users", "content": "My Account > Delete Account로 즉시 삭제" },
      "nonRegistered": { ... }
    },
    "children": { "title": "10. Children's Privacy", ... },
    "changes": { "title": "11. Changes to This Policy", ... },
    "contact": { "title": "12. Contact Us", ... }
  }
}
```

## 구현 순서

### Task 1: messages/en.json Privacy 섹션 완성
- 현재 하드코딩된 영문 텍스트를 JSON 구조로 이동
- 3가지 수정사항 반영
- DoD: `pnpm lint` 통과

### Task 2: ko/ja/zh-CN 번역 추가
- 법적 문서 어조 유지 (정중하고 명확한 표현)
- DoD: 4개 JSON 파일 모두 동일 키 구조

### Task 3: page.tsx 리팩토링
- `useTranslations('Privacy')` 활용
- 기존 UI 컴포넌트 (SectionTitle, SubSection 등) 유지
- 메타데이터 noindex 제거 확인
- DoD: `pnpm build` 성공, 모든 언어에서 정상 렌더링

## 예상 파일 변경
- `messages/en.json` (수정)
- `messages/ko.json` (수정)
- `messages/ja.json` (수정)
- `messages/zh-CN.json` (수정)
- `app/[locale]/privacy/page.tsx` (수정)

## 테스트 체크리스트
- [ ] /en/privacy 페이지 정상 렌더링
- [ ] /ko/privacy 페이지 정상 렌더링
- [ ] /ja/privacy 페이지 정상 렌더링
- [ ] /zh-CN/privacy 페이지 정상 렌더링
- [ ] 메타데이터 언어별 정상 적용
- [ ] 검색엔진 노출 가능 (noindex 없음)
