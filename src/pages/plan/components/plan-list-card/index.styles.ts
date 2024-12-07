import { css } from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 16px;
`

export const numberLabel = css`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: ${colors.color.Sequence};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const listCardWrapper = css`
    width: 100%;
    height: 150px;
    border-radius: 4px;
    border: 1px solid ${colors.color.Gray5};

`