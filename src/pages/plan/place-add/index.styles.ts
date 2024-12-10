import { css } from '@emotion/react'
import colors from '../../../styles/colors'

export const contentWrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh; /* 화면 전체 높이 */
    /* overflow: hidden; //내부 콘텐츠만 스크롤 가능 */
    position: relative;
    padding : 79px 0 0;
`
export const wrapper = css`
    flex: 1; //나머지 공간을 차지
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100% - 79px); /* 전체 화면 높이에서 패딩 제외 */
    
`

export const tabWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const tabItem = (tab : string, activeTab:string) => css`
    flex: 1;  // 각 항목이 동일한 너비를 가지도록 설정
    text-align: center;  // 텍스트 가운데 정렬
    padding: 10px 0 0; 
    margin: 0 50px;
    cursor: pointer;
    color: ${activeTab === tab? colors.color.MainColor : colors.color.Black};
    border-bottom: 5px solid ${activeTab === tab? colors.color.MainColor : "none"};
`

export const tabAreaWrapper = css`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    padding: 0 30px;
    overflow-y: auto;
`

export const bottomButtonStyle = css`
    position: sticky; /* 스크롤 시에도 화면 하단에 고정 */
    bottom: 0;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto 0 0 0;
    padding: 12px;
    background-color: ${colors.color.White1};
`;

export const headerContainerStyle = css`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: row;
    height: 60px;
    padding: 20px 20px 0;
`;
export const searchBarWrapperStyle = css`
    flex: 1;
    display: flex;
    background: ${colors.color.Gray6};
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    height: 100%;
    width: 100%;
`;

export const searchInputStyle = css`
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: ${colors.color.Black};
    ::placeholder {
        color: ${colors.color.Gray3};
    }
`;

export const searchIconStyle = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 15px;
`;




