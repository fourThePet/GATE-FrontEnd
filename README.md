# GATE - Frontend
<div align="center">
<h2>GATE : 강아지와의 데이트, 행복의 문을 여는 순간</h2>

'GATE'는 반려인과 반려견이 함께 행복한 시간을 보낼 수 있도록 돕는 플랫폼입니다. 반려견 동반 가능 장소를 쉽고 정확하게 검색할 수 있는 기능을 제공하며, 사용자와 반려견의 프로필을 기반으로 맞춤 장소를 추천합니다. 

#### GATE와 함께 행복의 문을 열어보세요!
</div>


# 목차
- [개발기간](#개발기간) 
- [개발환경](#개발환경) 
- [서버 실행 방법](#서버-실행-방법)
- [디렉토리 구조](#디렉토리-구조)
- [각 기능 소개](#각-기능-소개)

## 개발기간
**2024.11.12 ~ 2024.12.24**

## 개발환경
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

## 서버 실행 방법

- 최초 실행
```
# node 버전 확인
node -v

# yarn 설치
npm install -g yarn
yarn --version
yarn install 

```

- 서버 실행 
```
yarn dev
```

## 디렉토리 구조
```
📦src
 ┣ 📂api
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┗ 📂svg
 ┣ 📂components
 ┣ 📂interfaces
 ┣ 📂pages
 ┣ 📂provider
 ┣ 📂queries
 ┣ 📂stores
 ┣ 📂stories
 ┣ 📂styles
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜router.tsx
 
```
#### 1. 📦 src
애플리케이션의 **핵심 소스** 코드가 저장된 루트 폴더.

#### 2. 📂 api
**서버와 통신하기 위한 API** 관련 코드를 저장. Axios 요청 파일, API 경로, 데이터 통신 로직 등이 포함.

#### 3. 📂 assets
정적 파일을 관리.
이미지, 폰트, 아이콘 등과 같은 애플리케이션 전역에서 사용되는 리소스.
- 📂fonts : 폰트 파일들을 보관하는 폴더.
- 📂svg : SVG 파일들이 위치하는 폴더, 프로젝트에서 사용하는 아이콘 또는 벡터 이미지가 저장.

#### 4. 📂 components
**재사용 가능한 UI 컴포넌트**를 저장. 버튼, 모달, 입력 폼 등 여러 페이지에서 공통으로 사용할 수 있는 컴포넌트.

#### 5. 📂 interfaces
TypeScript에서 사용하는 **데이터 타입과 인터페이스**를 정의.
API 응답 타입, 전역 상태 타입 등 프로젝트에서 사용하는 타입 정의를 관리.

#### 6. 📂 pages
각 페이지별로 컴포넌트를 분리하여 저장. **라우팅 경로에 따라 연결되는 UI**를 정의.

#### 7. 📂 provider
React Query의 QueryClientProvider와 같은 **프로바이더**가 포함.

#### 8. 📂 queries
**React Query** 라이브러리를 사용하여 서버와의 데이터 페칭을 처리.
API 요청과 관련된 쿼리 함수들이 포함.

#### 9. 📂 stores
**전역 상태 관리 파일**을 저장. 상태 관리 라이브러리를 사용하는 경우 상태와 액션을 정의하는 파일.

#### 10. 📂 styles
전역 스타일과 테마를 관리.

#### 11. 📂 stories
Storybook을 사용하는 경우 컴포넌트의 시각적 테스트를 위한 파일을 저장.
컴포넌트별 .stories.tsx 파일을 통해 각 컴포넌트의 다양한 상태를 미리보기.

#### 12. 📂 utils
**재사용 가능한 유틸리티 함수들**이 포함되는 폴더.

#### 13. 📜 App.tsx
애플리케이션의 **진입점 컴포넌트**.
전역 라우팅 설정 및 애플리케이션의 기본 레이아웃 정의.

#### 14. 📜 main.tsx
애플리케이션을 **렌더링**하는 파일.
`App.tsx`를 DOM에 연결하는 역할.

#### 15. 📜 router.tsx
애플리케이션의 **라우팅을 정의**하는 파일.
각 URL 경로에 해당하는 컴포넌트들을 설정하고, 라우트와 라우터를 관리.

#### 16. 📜 package.json
프로젝트의 의존성 및 스크립트를 정의하는 파일.
설치된 라이브러리, 버전, 실행 가능한 스크립트 등의 정보 포함.


## 각 기능 소개 

#### [회원 시스템]
- 소셜 로그인
- 회원정보 등록

#### [반려견 정보 관리 시스템]
- 반려견 프로필 조회/등록/수정/삭제

#### [장소 검색 시스템]
- 검색 조건에 따른 장소 리스트 조회
- 현 위치 기반 조회

#### [즐겨찾기 시스템]
- 장소 상세보기에서 즐겨찾기 등록
- 일정 생성 시, 즐겨찾기 리스트 조회 가능
- 지도에 즐겨찾기에 등록한 위치 표시
- 마이페이지 > 내 즐겨찾기에서 즐겨찾기 조회, 삭제

#### [리뷰 시스템]
- 영수증 인증 리뷰 작성 
- 장소에 대한 사진, 동영상, 별점, 텍스트 리뷰 작성
- AI 후기 요약 (ChatGPT 이용)
- 마이페이지 > 내 리뷰에서 작성한 리뷰 조회/수정/삭제

#### [일정 시스템]
- 사용자와 반려견 맞춤 일정 경로 추천
- 일정 생성/조회/수정/삭제

|회원 시스템|반려견 정보 관리 시스템|장소 검색 시스템|즐겨찾기 시스템|리뷰 시스템|일정 시스템|
|------|------|------|------|------|------|
|<img src="https://github.com/user-attachments/assets/2ba44fbf-ed6e-410c-8ec0-c45efc6fd51a" width="200" height="400"/> |<img src="https://github.com/user-attachments/assets/c4f729cf-35f8-444c-946d-f9f81d1bfa78" width="200" height="400"/> |<img src="https://github.com/user-attachments/assets/ee55cf26-a88d-49ed-a7ac-e42a3ce63baf" width="200" height="400"/> |<img src="https://github.com/user-attachments/assets/2ee4a9be-b21d-442b-afb6-19d768d7236c" width="200" height="400"/> |<img src="https://github.com/user-attachments/assets/af942b92-bad4-457e-922a-b8a18464696f" width="200" height="400"/> | |
|<img src="https://github.com/user-attachments/assets/0561f372-ae58-4ad5-8e37-0c7cafba2490" width="200" height="400"/>|<img src="https://github.com/user-attachments/assets/17563fb4-5d24-46f6-887f-7de04158b54f" width="200" height="400"/> </br> <img src="https://github.com/user-attachments/assets/2f39e0ab-283e-4379-a1b0-658bf4385566" width="200" height="400"/>|<img src="https://github.com/user-attachments/assets/7406a67b-30ef-4c04-b3fe-f74a644eb333" width="200" height="400"/>|<img src="https://github.com/user-attachments/assets/42a3185b-0688-4c87-ac24-92c5123c8cc1" width="200" height="400"/>|<img src="https://github.com/user-attachments/assets/d69e52c9-7e75-4cc1-bbd7-15dfd3552070" width="200" height="400"/> </br> <img src="https://github.com/user-attachments/assets/23cf1dbe-e957-445e-af41-97f70c98684d" width="200" height="400"/> </br> <img src="https://github.com/user-attachments/assets/3c8f76b0-a855-43cf-b453-38cf1b52a418" width="200" height="400"/>|
|로그인, 회원가입 화면|반려동물 등록, 조회, 삭제, 수정 화면|현 위치 기반 장소 조회 화면|즐겨찾기 추가,조회 화면|영수증 리뷰 작성 화면|일정 경로 추천 화면|
