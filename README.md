# 페이히어 프론트엔드 엔지니어 과제

## 환경설정

### 1. react.js 사용

`payhere` 프로젝트는 CRA를 사용해 생성하였습니다. React.js는 18.2.0 버전으로 설치하였고, TypeScript를 사용하였습니다.

### 2. 프로젝트 실행

`npm i` , `npm start` 명령어로 로컬에서 프로젝트를 실행합니다.

### 3. env 파일

`.env` 파일을 생성한 뒤, `GITHUB_ACCESS_TOKEN` 변수에 github 개발자설정에서 발급받은 토큰 값을 저장합니다.
github API 호출 시 해당 토큰값을 사용하게 됩니다.

## 설치 라이브러리

`octokit`: github API 사용 라이브러리

`react-router-dom`: 라우터 라이브러리

`primereact/primeicons` , `tailwindcss`: 디자인 UI 컴포넌트 라이브러리

## 기타

`components`/`modal`/`pages`/`routes`/`services` 등으로 코드를 나눠 작성하였습니다만, components와 pages를 잘 나누지 못했다고 생각합니다. 개인 사정상 구현시간이 이틀 정도의 시간밖에 없어 재사용성을 많이 고려하지 못했습니다.

같은 이슈로 타입스크립트를 사용하였지만, 타입 정의를 제대로 하지 못했습니다. 구현을 목표로 하여 먼저 any 타입으로 작성하였는데 수정하지 못하였습니다.

상태관리 라이브러리를 사용한 것이 아니라 localStorage를 사용해 상태를 관리한 것이 기억에 남습니다.
