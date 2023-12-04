# Container/Presentational Pattern

애플리케이션 로직에서 view를 분리하여 관심사 분리(Separation of Concerns)를 적용하는 방법

## 6마리 강아지 사진을 보여주는 어플리케이션

Presentational 컴포넌트

- 유저에게 `데이터를 어떻게 보여줄지` 결정 (View)
- DogImages.tsx

Container 컴포넌트

- 유저에게 `어떤 데이터`를 보여줄지 결정 (App Logic)
- DogImagesContainer.tsx

## Presentational 컴포넌트

- 표시할 data 를 props로 전달받음
- 일반적으로 자체적인 상태를 갖지 않음

## Container 컴포넌트

- 내부적으로 포함하고 있는 Presentational 컴포넌트에 data를 전달하는 역할
- 일반적으로 Presentational 컴포넌트 이외의 컴포넌트를 렌더링하지 않음

## useDogImages Hook으로 대체하기

일반적으로 Container/Presentational 패턴은 Hooks 로 대체할 수 있다

- Container 에서 fetching 을 수행하는 것 대신, useDogImages 훅에서 fetching을 수행
- Presentational 컴포넌트 (DogImages.tsx) 에서 직접 훅을 통해 data를 전달받을 수 있다

## Container/Presentational Pattern의 장점과 단점

장점

- 관심사 분리가 쉽다
  - 프레젠테이셔널 컴포넌트는 UI를 담당하는 순수 함수
  - 컨테이너 컴포넌트는 앱 상태와 데이터 담당
- 재사용이 쉽다
  - 프레젠테이셔널 컴포넌트는 데이터를 표시하는 역할만 수행하기 때문에 재사용이 쉽다
- 테스트가 쉽다
  - 프레젠테이셔널 컴포넌트는 보통 순수함수이기 때문에 테스트가 쉽다

단점

- Hooks를 사용하는 것이 더 간편하다