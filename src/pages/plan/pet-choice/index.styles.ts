import { css } from "@emotion/react";


export const buttonStyle = css`
    transition: background-color 0.3s ease;
`
export const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 80px 0;
  gap: 40px;
`
export const headerWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`
export const titleWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const petRegisterButton = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

export const petSelectStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  transition: border 0.2s ease;
  gap: 8px;
`

export const petWrapper =css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`

export const dogImageStyle = css`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
export const selectedDogStyle = css`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const footerStyle = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  padding: 10px 18px;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); */
  z-index: 10;
`;