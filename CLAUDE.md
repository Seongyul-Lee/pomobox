# pomobox - Claude Code Operating Rules

## Default workflow
- 계획/작업쪼개기/다음 할 일 관리는 taskmaster-ai(MCP)를 우선 사용한다.
- 외부 라이브러리/프레임워크(Next.js/React 등) API가 불확실하면 context7(MCP)로 문서를 확인한 뒤 답한다.
- 로컬 코드(레포 내부 구현)는 context7로 묻지 말고, 현재 파일/변경 diff를 근거로 답한다.

## Quality gates (finish conditions)
- 작업 종료 전: 관련된 최소 명령을 실행한다: pnpm lint, pnpm build (테스트가 있으면 pnpm test)
- 커밋 메시지는 한국어로 작성한다.

## Safety
- .env / 비밀키 / 토큰 값은 읽거나 출력하지 않는다.
- 파괴적 명령(삭제/대량 변경)은 실행 전 반드시 변경 범위와 롤백을 제시한다.
