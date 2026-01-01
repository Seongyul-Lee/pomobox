---
description: 배포 전 체크리스트 실행
allowed-tools: Bash(pnpm:*), Bash(git:*), Read, Grep
---

배포 전 체크리스트를 실행한다.

## 1. Quality Gates

### 필수 검사
```bash
pnpm lint
pnpm build
```

에러 발생 시 즉시 수정 방안 제시.

### 고위험 변경 시 (선택)
```bash
pnpm e2e
```

## 2. 코드 품질

### 확인 항목
- console.log / console.error 제거 (디버깅용)
- TODO / FIXME 주석 확인
- 하드코딩된 값 확인
- 주석 처리된 코드 제거

### 검색 명령
- `console.log` 검색
- `// TODO` 검색
- `// FIXME` 검색

## 3. 보안 점검

### 확인 항목
- 환경변수 노출 여부 (.env 값이 코드에 없는지)
- API 키 / 시크릿 하드코딩 여부
- 민감한 정보 로깅 여부

## 4. Git 상태

### 확인
- 커밋되지 않은 변경사항
- 현재 브랜치 확인
- main/master와의 차이

## 출력 형식

### 성공 시
- 모든 검사 통과
- 배포 준비 완료

### 실패 시
- 실패 항목 목록
- 각 항목별 수정 방안
- 수정 후 재실행 안내
