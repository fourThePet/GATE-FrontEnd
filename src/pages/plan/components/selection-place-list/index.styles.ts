import { css } from "@emotion/react";

export const wrapper = css`
    display: flex;
    width: 100%;
    height: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    gap: 16px;
`

export const imageWrapper =css`
    width: 80px;
    height: 80px;
    border-radius: 4px;
`
export const imageItem = css`
    width: 100%;
    height: 100%;
   
`

export const titleWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: auto;
`

export const favoriteCount = css`
    display : flex;
    align-items: center;
    gap: 4px;
`