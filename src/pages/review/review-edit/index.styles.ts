import { css } from "@emotion/react"
import colors from "../../../styles/colors"

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    overflow: hidden; //내부 콘텐츠만 스크롤 가능
    position: relative;
    padding-top: 80px;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    padding: 0 30px;
    gap: 20px;
`
export const mainWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`
export const titleWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`

export const starStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    .react-stars {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .react-stars span {
        margin-right: 10px; /* 별 간격 */
        transition: color 0.3s ease, transform 0.2s ease; /* 부드러운 전환 효과 */
    }

    .react-stars span:hover {
        color: ${colors.color.MainColor}; /* 호버 시 활성화된 별 색상 */
        transform: scale(1.2); /* 호버 시 확대 효과 */
    }

`

export const formTitleWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
`

export const sizeWrapper = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
`

export const iconWrapper = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
`
export const labelWrapper = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2칸으로 설정 */
    gap: 20px;
    width: 100%;

    @media (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr); 
    }
    
`

export const borderWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 400px;
    flex-wrap: wrap;
    border-radius: 20px;
    border: 1px solid ${colors.color.Gray4};
    padding: 20px;
`

export const reviewTitle = css`
    display: flex;
    flex-direction: row;
    gap: 5px;
`

export const textArea = css`
    width: 100%;
    height: 170px;

`
export const imageWrapper =(isCentered: boolean) => css`
    display: flex;
    flex-direction: row;
    justify-content: ${isCentered ? "center" : "flex-start"};
    align-items: center;
    gap: 20px;
    width: 100%;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 10px;
    border: 1px solid ${colors.color.Gray4};
`

export const fileWrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 150px;
`

export const fileSize = css`
    width: 100px;
    height: 100px;
    border-radius: 5px;
`

export const deleteIcon = css`
    position: absolute;
    top: 30px;
    right: 5px;
    cursor: pointer;
    
`

export const charsCount = css`
    display: flex;
    justify-content: flex-end;
    align-items: end;
    width: 100%;
    margin-top: auto;
`


export const bottomButtonStyle = css`
    position: sticky; /* 스크롤 시에도 화면 하단에 고정 */
    bottom: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto 0 0 0;
    padding: 12px;
    gap: 20px;
    background-color: ${colors.color.White1};
`;

export const addIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
`

export const fileInput = css`
  display: none; /* 파일 업로드 버튼 숨김 */
`;

export const tooltipStyle = css`
  width: 180px;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 20px;
  left: 0;
  background-color: ${colors.color.White1};
  color: ${colors.color.MainColor};
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  white-space: pre-line;
  border: 1px solid  ${colors.color.MainColor};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 10;

  .button-wrapper:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

export const sizeTitle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  
`

export const help = css`
  display: flex;  
  position: relative;
  align-items: center;
`