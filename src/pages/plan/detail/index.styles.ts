import { css } from '@emotion/react'
import colors from '../../../styles/colors'

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
    padding-top: 79px;
`
export const deleteIcon = css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
`
export const info = css`
    background-color: ${colors.color.MainColor};
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 30px;
`

export const dateWrapper = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-block: auto;
`

export const mapWrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
`

export const listWrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 500px;
`