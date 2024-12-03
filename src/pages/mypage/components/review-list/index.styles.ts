import { css } from "@emotion/react"
import colors from "../../../../styles/colors"

export const wrapper = css`
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
`

export const cardWrapper = css`
    border-radius: 5px;
    border: 1px solid ${colors.color.Gray3};
    width: 90%;
    height: 100%;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    margin: 12px;
`

export const titleWrapper = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
`

export const line = css`
    margin: 2px 0px;
    width: 100%;
`