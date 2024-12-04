import { css } from "@emotion/react"

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    overflow: hidden; //내부 콘텐츠만 스크롤 가능
    position: relative;
    padding : 80px 0;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    padding: 10px 30px 0;
    gap: 20px;
    justify-content: flex-start;
`

export const countWrapper = css`
    width: 100%;
`

export const allListWrapper = css`
    display: contents;
    width: 100%;
`

export const bottomButtonStyle = css`
    position: sticky; /* 스크롤 시에도 화면 하단에 고정 */
    bottom: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto 0 0 0;
    padding: 12px;
`;