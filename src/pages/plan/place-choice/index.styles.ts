import { css } from '@emotion/react'

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    /* overflow: hidden; //내부 콘텐츠만 스크롤 가능 */
    position: relative;
    padding : 79px 0 0;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 79px); /* 전체 화면 높이에서 패딩 제외 */
    overflow-y: auto;
`

export const titleWrapper = css`
    display: flex;
    width: 100%;
    height: 100px;
    padding: 0 30px;
    flex-direction: column;

`
export const dateWrapper = css`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;

`

export const mapWrapper = css`
    display: flex;
    width: 100%;
    height: 300px;
    justify-content: center;
    align-items: center;
`

export const placeWrapper =css`
    display: flex;
    width: 100%;
    height: calc(100%-450px);
    padding: 0 30px;
    flex-direction: column;
`

export const actionWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

export const textWrapper = css`
    margin-right: auto;
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const noData = css`
    width: 100%;
    margin: auto;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

`

export const bottomButtonStyle = css`
  position: sticky; /* 스크롤 시에도 화면 하단에 고정 */
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 18px;
  background-color: white; /* 배경색 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;