import { DefaultTheme } from "styled-components";

const fontColor = {
  MainColor: "#F1729B",
  Pink: "#D04578",
  lightPink: "#f8a8c2",
  Blue: "#7EB6FF", //인증
  Star: "#FFA31A", //별점

  //gray
  White: "#FFFFFF",
  Gray6: "#F2F2F7",
  Gray5: "#E5E5EA",
  Gray4: "#D1D1D6",
  Gray3: "#C7C7CC",
  Gray2: "#AEAEB2",
  Gray1: "#8E8E93",
  Gray: "#E8E8E8",
  Black: "#1C1C1E",
};

const fontSize = {
  size100: "10px",
  size200: "12px",
  size300: "13px",
  size400: "14px",
  size500: "17px",
  size550: "20px",
  size600: "64px",
};

const fontWeight = {
  Normal: "400",
  SemiBold: "600",
  Bold: "700",
};

const colors: DefaultTheme = {
  color: fontColor,
  size: fontSize,
  weight: fontWeight,
};

export default colors;