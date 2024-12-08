import { css } from '@emotion/react'

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    /* overflow: hidden; //내부 콘텐츠만 스크롤 가능 */
    position: relative;
    padding : 79px 0;
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

export const infoWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
`

export const mapWrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
`

export const listWrapper = css`
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: calc(100% - 500px);
    gap: 12px;
    overflow-y: auto;
`