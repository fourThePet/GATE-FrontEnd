import { css } from '@emotion/react'
import colors from '../../styles/colors'

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    overflow: hidden; //내부 콘텐츠만 스크롤 가능
    position: relative;
    padding-bottom  : 80px;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
`

export const loginInfo = css`
    background-color: ${colors.color.MainColor};
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const textWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-inline-start: 30px;
`

export const iconStyle = css`
    padding-inline-end: 30px;
`

export const myInfoWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 30px 30px;
`

export const line = css`
    margin: 2px 0px;
`

export const infoWrapper =css`
    display: flex;
    flex-direction: column;
`

export const titleWrapper = css`
    display: flex;
    justify-content: space-between;
    padding: 4px;
`

export const myActiveWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px 16px;
`

export const myWrapper = css`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
`

export const myPetWrapper = css`
    overflow-x: auto;
    height: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

`