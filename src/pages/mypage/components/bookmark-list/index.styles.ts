import { css } from "@emotion/react";

export const wrapper = css`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    gap: 16px;
`

export const listWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: auto;
`

export const menuWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;  
`

export const imageWrapper =css`
    width: 80px;
    height: 80px;
    border-radius: 4px;
`
export const imageItem = css`
    width: 100%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
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