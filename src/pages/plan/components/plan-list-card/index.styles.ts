import { css } from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 16px;
    align-items: baseline;
`

export const listCardWrapper = css`
    width: 90%;
    height: 100px;
    border-radius: 4px;
    border: 1px solid ${colors.color.Gray5};
    padding:20px 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
`

export const titleWrapper = css`
    display: flex;
    gap: 10px;
    flex-direction: row;
`

export const detailInfoWrapper = css`
    display: flex;

`