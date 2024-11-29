import {css} from '@emotion/react'
import colors from '../../../../styles/colors'

export const wrapper = css`
    border-radius: 16px;
    border: 2px solid ${colors.color.MainColor};
    width: 100%;
    height: 160px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    
`