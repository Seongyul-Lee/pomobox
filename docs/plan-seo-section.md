# Plan: 메인 페이지 SEO 섹션 추가

## 목표
메인 페이지(`app/[locale]/page.tsx`) 하단에 "포모도로 기법 요약 섹션" 삽입하여 SEO 강화

## 현재 구조
```
[대시보드 그리드] -> [광고 영역 h-24] -> [Footer]
```

## 변경 후 구조
```
[대시보드 그리드] -> [SEO 섹션] -> [광고 영역 h-24] -> [Footer]
```

---

## 작업 목록

### Task 1: i18n 메시지 추가 (4개 언어 파일)

**변경 파일:**
- `messages/en.json`
- `messages/ko.json`
- `messages/ja.json`
- `messages/zh-CN.json`

**추가할 키 (Home 네임스페이스):**
```json
"seoSectionTitle": "What is the Pomodoro Technique?",
"seoSectionDesc": "The Pomodoro Technique is a time management method that involves 25 minutes of focus and 5 minutes of rest. Use Pomobox to overcome procrastination and boost productivity.",
"seoSectionMore": "Read more about Pomodoro"
```

**DoD:**
- 4개 언어 파일에 위 3개 키 추가
- `pnpm build` 성공

---

### Task 2: page.tsx에 SEO 섹션 컴포넌트 삽입

**변경 파일:** `app/[locale]/page.tsx`

**삽입 위치:** `<div className="h-24 mb-2" />` 바로 위

**UI 구현:**
```tsx
{/* SEO Section */}
<section className="mb-8 siderail-margin">
  <div className="px-4 xl:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-lg xl:text-xl font-bold text-white mb-3">
        {t("seoSectionTitle")}
      </h2>
      <p className="text-sm xl:text-base text-gray-400 mb-4 leading-relaxed">
        {t("seoSectionDesc")}
      </p>
      <LocaleLink
        href="/guide/what-is-pomodoro"
        className="text-primary hover:underline text-sm"
      >
        {t("seoSectionMore")} →
      </LocaleLink>
    </div>
  </div>
</section>
```

**스타일 상세:**
- 배경: 투명 (깔끔한 텍스트 배치)
- 제목: `text-lg xl:text-xl font-bold text-white`
- 본문: `text-sm xl:text-base text-gray-400`
- CTA: `text-primary hover:underline` (텍스트 링크 스타일)
- 간격: `mb-8` (광고 영역과 적절한 여백)
- 너비: `max-w-3xl mx-auto` (중앙 정렬, 가독성 확보)

**DoD:**
- SEO 섹션이 광고 영역 바로 위에 표시
- 반응형 동작 확인 (모바일/데스크탑)
- `/guide/what-is-pomodoro` 링크 정상 작동
- `pnpm lint && pnpm build` 성공

---

## 변경 요약

| 파일 | 변경 내용 |
|------|----------|
| `messages/en.json` | Home에 3개 키 추가 |
| `messages/ko.json` | Home에 3개 키 추가 |
| `messages/ja.json` | Home에 3개 키 추가 |
| `messages/zh-CN.json` | Home에 3개 키 추가 |
| `app/[locale]/page.tsx` | SEO 섹션 JSX 추가 |

**총 변경 파일: 5개**

---

## 확인 사항

1. 기존 `siderail-margin` 클래스가 `page.tsx`에서 사용 중인지? → 사용 중 (line 51)
2. `LocaleLink`가 이미 import 되어 있는지? → 되어 있음 (line 4)
3. `getTranslations("Home")` 사용 중인지? → 사용 중 (line 39의 `t`)
