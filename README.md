# portfolio-website
내 포트폴리오를 소개합니다
## 제작 과정
### 1. Next.js 설치
```
npx create-next-app@latest
```
- TS, ESLint 사용 여부를 CLI에서 확인

### 2. tailwind 설치
- Next.js 용 tailwind 를 사용하기 위해 tailwind docs에서 검색
- -p: postcss.config.js 도 생성
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- tailwind.config.js 작성
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- global.css 최상단에 코드 추가
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```