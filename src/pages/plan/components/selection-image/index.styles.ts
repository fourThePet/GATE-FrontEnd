import { css } from "@emotion/react"

export const wrapper = css`
    display: flex;
`
export const imageWrapper =css`
    display: inline-flex; /* 인라인 요소로 설정 */
    width: 100%;
    height: 100%;
    border-radius: 4px;
    align-items: center;
    position: relative;
`
export const imageItem = css`
    width: 80px;
    height: 80px;
    object-fit: cover;
`
export const deleteIcon = css`
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;   
`

export const titleWrapper = css`
    width: 80px;
    display: flex;
    white-space: normal;
`