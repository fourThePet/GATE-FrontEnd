import * as React from "react";
import type { SVGProps } from "react";
const SvgSdogpink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 68 68"
    {...props}
  >
    <g filter="url(#sdogpink_svg__a)">
      <rect width={60} height={60} x={4} y={2} fill="#F1729B" rx={20} />
    </g>
    <path
      fill="#fff"
      d="M48.299 25.04a29 29 0 0 1-4.837-1.308c-.792-5.393-5.406-4.948-10.281-4.458-5.567.556-11.8 12.79-12.065 13.31a.94.94 0 0 0-.093.66.84.84 0 0 0 .365.53.7.7 0 0 0 .595.072.79.79 0 0 0 .456-.431c1.356-2.683 5.02-8.867 8.46-11.377a9.65 9.65 0 0 0 .034 7.58c.853 1.841 2.254 3.003 3.633 3.003h.148c3.181-.198 3.974-8.086 4.1-9.664v-.002c.036-.466-.271-.876-.689-.918s-.785.302-.822.768c-.267 3.351-1.346 8.039-2.673 8.122-.809.046-1.748-.788-2.351-2.085-.421-.913-1.569-4.131.933-7.86l.103-.018c5.9-.593 8.337-.438 8.694 3.513h.002c.028.331.228.612.511.719.136.05 3.32 1.23 5.584 1.535.132 0 .435.55.35 1.639-.173 2.254-2.192 6.418-8.67 6.036v.002c-.295-.024-.573.15-.71.442-.097.198-2.34 4.875-3.158 9.14v-.001c-.087.458.173.909.582 1.007a.8.8 0 0 0 .159 0c.357-.002.666-.28.743-.669.644-3.28 2.215-6.949 2.795-8.223 7.226.212 9.567-4.821 9.783-7.594.147-1.901-.528-3.312-1.682-3.469"
    />
    <defs>
      <filter
        id="sdogpink_svg__a"
        width={68}
        height={68}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_142_1120"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_142_1120"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgSdogpink;
