import { css } from '@emotion/react'
import colors from '../../../../styles/colors'



export const inputStyle = ({width} : {width : string}) => css`
    width: ${width};
    height: 20px;
    padding: 8px 0 16px;
    border: none;
    border-bottom: 1px solid ${colors.color.Gray5} ;
    outline: none;
    color : ${colors.color.Black};
    &::placeholder {
        position: relative;
        color: ${colors.color.Gray5};
    }

    &:focus {
        border-bottom: 1px solid ${colors.color.MainColor};
    }
`

