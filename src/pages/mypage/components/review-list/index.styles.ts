import { css } from "@emotion/react"
import colors from "../../../../styles/colors"

export const wrapper = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    gap: 10px;
`
export const dateWrapper = css`
    padding-inline: 12px;
    width: 100%;
`
export const cardWrapper = css`
    border-radius: 5px;
    border: 1px solid ${colors.color.Gray3};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`

export const titleWrapper = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
`

export const line = css`
    margin: 2px 0px;
    width: 100%;
`
export const menuIcon = css`
    margin-left: auto;
`
export const textWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 8px;

`

export const labelWrapper = css`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px 0;
`

export const imageWrapper = css`
    width: 100%;
    display: flex;
    flex-wrap: wrap; /* 줄바꿈 허용 */
    gap: 5px; /* 이미지 간 간격 */
`;

export const imageStyle = css`
    width: calc(25% - 5px); /* 한 줄에 4개씩 배치 */
    max-width: 120px; /* 최대 너비 제한 */
    height: auto; /* 이미지 비율 유지 */
    object-fit: cover; /* 이미지 잘림 방지 */
    border-radius: 8px; /* 둥근 모서리 */
`;