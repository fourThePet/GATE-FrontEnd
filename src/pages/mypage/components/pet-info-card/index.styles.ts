import {css} from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    border-radius: 16px;
    border: 2px solid ${colors.color.MainColor};
    width: 120px;
    height: 160px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    
`

export const imageStyle = css`
    width: 60px;
    height: 60px;
    border-radius: 50%;
`

export const line = css`
    margin: 2px 0px;
    width: 100px;
`

export const petInfo = css`
    display: flex;
    flex-direction: column;
    /* align-items: flex-start; */
    align-items: center;
    justify-content: center;
    gap: 4px;
`