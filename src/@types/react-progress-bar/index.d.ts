declare module "react-progress-bar" {
  import React from "react";

  interface ProgressBarProps {
    completed: number; // 완료된 퍼센티지 (0 ~ 100)
    maxCompleted?: number; // 최대 퍼센티지 (기본값: 100)
    height?: string | number; // Progress Bar 높이
    bgColor?: string; // Progress Bar 색상
    baseBgColor?: string; // Progress Bar 기본 배경색
    labelColor?: string; // 레이블 색상
    className?: string; // 추가 클래스 이름
    labelAlignment?: "left" | "center" | "right"; // 레이블 정렬
    customLabel?: string; // 커스텀 레이블
    animateOnRender?: boolean; // 애니메이션 여부
    isLabelVisible?: boolean; // 레이블 보이기 여부
  }

  const ProgressBar: React.FC<ProgressBarProps>;
  export { ProgressBar };
}
