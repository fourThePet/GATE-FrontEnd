import {css} from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    border-radius: 16px;
    border: 2px solid ${colors.color.MainColor};
    width: 160px;
    height: 200px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    
`

export const imageStyle = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`

export const line = css`
    margin: 2px 0px;
    width: 90%;
`

export const petInfo = css`
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    align-items: center;
    justify-content: center;
    gap: 4px;
`