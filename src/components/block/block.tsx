import { css } from "@emotion/react";
/** @jsxImportSource @emotion/react */

// Block 타입 정의
type StyleBlock = {
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  pointer?: boolean;
  gap?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: string;
  maxWidth?: string;
};

export const Block = {
  // AbsoluteBox 스타일 정의
  absoluteBlock: (props: StyleBlock) => css`
    position: ${props.position || "absolute"};
    top: ${props.top || "auto"};
    right: ${props.right || "auto"};
    bottom: ${props.bottom || "auto"};
    left: ${props.left || "auto"};
    z-index: ${props.zIndex || "auto"};
    width: ${props.width || "100%"};
    height: ${props.height || "auto"};
    min-width: 375px;
    max-width: ${props.maxWidth || "600px"};
    margin: ${props.margin || "0"};
    padding: ${props.padding || "0"};
    border: ${props.border || "none"};
    border-radius: ${props.borderRadius || "0"};
    background-color: ${props.bgColor || "transparent"};
    cursor: ${props.pointer ? "pointer" : "default"};
  `,

  // FlexBox 스타일 정의
  flexBlock: ({
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    width = "100%",
    height = "auto",
    margin = "0",
    padding = "0",
    border = "none",
    borderRadius = "0",
    bgColor = "transparent",
    pointer = false,
    gap = "0",
  }: StyleBlock) => css`
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    width: ${width};
    height: ${height};
    margin: ${margin};
    padding: ${padding};
    border: ${border};
    border-radius: ${borderRadius};
    background-color: ${bgColor};
    cursor: ${pointer ? "pointer" : "default"};
    gap: ${gap};
  `,
};
