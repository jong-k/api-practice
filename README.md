# gatsby-tutorial
## 1. Gatsby 소개
[Gatsby 공식 사이트](https://www.gatsbyjs.com/)
>Gatsby.js는 서버 렌더링 방식의 Next.js와 달리 React.js를 기반으로 하는 정적 사이트 생성기 프레임워크입니다. 정적 사이트 생성기는 빌드 타임에 정적 HTML을 생성합니다. 서버는 필요하지 않습니다. Next.js는 새 요청이 들어올 때마다 런타임에 HTML을 생성하므로 서버를 실행해야 합니다. 또한 Gatsby에서는 GraphQL을 사용하여 앱에서 데이터를 처리하는 방법을 결정하지만 Next.js의 경우 사용자가 이를 결정합니다.
- SSG : Static Site Generator
- React 기반
## 2. 시작
### Gatsby CLI로 빠르게 시작하기
- 2022/12/01 기준 최신 버전의 Gatsby 설치를 위해서는 Node.js 18 이상 버전 필요
```
npm install -g gatsby-cli
```

### starter template 참조하기
- Gatsby 공식 및 커뮤니티에서 제공하는 스타터 템플릿이 있음
- [스타터 라이브러리](https://www.gatsbyjs.com/starters)
- hello world version을 골라서 진행

### project start
- 사용할 스타터 url 확인 후 터미널에서 시작
```
만들 프로젝트 이름      참고할 템플릿 주소
           ________ _________________________________
gatsby new tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
```
또는 CLI에서 질문에 대답하며 프로젝트를 생성할 수도 있음
```
gatsbu new
```
- 프로젝트를 열고 package.json 에서 다양한 명령어가 등록된 것을 확인
  - gatsby develop(= npm start) : 개발 인스턴스 실행 (인스턴스용 public 폴더 생성)
  - gatsby build : 프로덕션 빌드 (빌드용 public 폴더 생성)
  - gatsby serve : 프로덕션 모드에서 앱 시작
  - gatsby clean : 빌드파일을 지움 (public 폴더 등 날라감)
### 빌드, 실행 테스트
- /public 내에 아무 사진이나 올린다
- http://localhost:8000/사진파일명 으로 접속해본다
- 사진 확인
- 빌드 실행
- src/index.js 에 img 태그를 만들고 src는 그대로 public을 기준으로 테스트해본다
  - build된 파일이 public에 위치하기 때문

- /src/pages 내에 about.js 만들고 기본적인 컴포넌트를 만들고 반환하면 http://localhost:8000/about 여기로 접근 가능

### 404 page
- 없는 페이지에 접속하면 404 Error가 발생한다.
- /src/page 내에 404.js 를 만들면 에러가 발생했을 때 띄울 페이지를 만들 수 있다.