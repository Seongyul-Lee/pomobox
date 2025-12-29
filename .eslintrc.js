module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. React/Next.js 관련
          ['^react', '^next'],
          // 2. 외부 라이브러리
          ['^@?\\w'],
          // 3. 내부 절대 경로 (@/, ~/)
          ['^@/', '^~/'],
          // 4. 상대 경로 (부모 → 현재 → 하위)
          ['^\\.\\./', '^\\./'],
          // 5. 스타일 파일
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
  ignorePatterns: ['node_modules/', '.next/', 'out/', 'ccseva/'],
}
