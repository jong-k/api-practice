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
gatsby new
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

## 3. 몇가지 팁
### 404 page
- 없는 페이지에 접속하면 404 Error가 발생한다.
- /src/pages 내에 404.js 를 만들면 에러가 발생했을 때 띄울 페이지를 만들 수 있다.

### nested page
- /src/pages 내에 company 폴더를 만들고
  - index.js 를 만들면 홈/company로 접근 가능 (pages/company.js 보다 우선)
  - home.js 를 만들면 company/home 으로 접근 가능

### link
- react-router-dom 의 Link와 같은 개념
- 외부 링크는 a 태그를 사용
- 존재하는 페이지만 설정할 수 있음
```js
import { Link } from "gatsby";
//...
<Link to="/about">about</Link>
```

## 4. Scss, Styled-components 사용
- Gatsby 플러그인 설치 필요
```
npm install sass gatsby-plugin-sass
npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```
- gatsby.config 에 코드 추가
```
module.exports = {
  plugins: [`gatsby-plugin-styled-components`, `gatsby-plugin-sass`],
};
```
- 참고로 reset css 를 위해 normalize.css 를 사용하면 편리하다
```
npm i normalize.css
```
```js
// layout이 시작되는 공간에서 import
import "normalize.css";
```

## 5. 이미지 사용
- width만 4000px가 넘는 2.5 mb의 고해상도 이미지를 사용하는데, 일반적으로 css로 witdh를 줄여서 사용하게 된다.
- 하지만, 크기를 줄여서 사용하더라도 2.5 mb의 크기의 사진을 브라우저가 받아오려면 불필요한 시간 낭비가 발생한다.
- 그래서 Gatsby의 이미지 플러그인을 사용한다
### gatsby-plugin-image
- Gatsby 에서 제공하는 이미지 처리용 공식 플러그인
- 설치
```
npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem gatsby-transformer-sharp
```
- 설정파일에 아래 플러그인을 추가한다
```js
module.exports = {
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
  ],
}
```
- 사용
```
import { StaticImage } from "gatsby-plugin-image"
```
- 이렇게 import 한 후 StaticImage 태그로 사용한다.
- 사진이 로딩될때까지 회색의 기본 이미지가 로딩되고, 용량이 줄어드는 장점이 있다.


- 반면 제한되는 점도 존재한다.
- src에 변수를 전달할 수 없으므로 경로를 지정해야 한다.
- props를 가질 수 있으나, 함수를 호출하는 props를 가질 수 없다.
  - 외부 스코프에서 참조하거나 하는것이 불가능


- layout
  - constrained(default) : 브라우저 창이 늘어나도 width 이상 사진이 커지지 않음 (width 이하에서는 자유롭게 움직임)
  - fixed : 사진 사이즈가 고정
  - fullWidth : width가 계속해서 커질 수 있음