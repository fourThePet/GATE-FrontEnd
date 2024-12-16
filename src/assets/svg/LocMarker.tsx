import * as React from "react";
import type { SVGProps } from "react";
const SvgLocMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 44 44"
    {...props}
  >
    <g filter="url(#loc-marker_svg__a)">
      <path
        fill="#007AFF"
        fillOpacity={0.18}
        d="M22 43a21 21 0 1 1 21-21 21.023 21.023 0 0 1-21 21"
      />
      <path
        fill="#fff"
        d="M22 36a14 14 0 1 1 14-14 14.016 14.016 0 0 1-14 14"
      />
    </g>
    <path
      fill="#007AFF"
      d="M22 32c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
    />
    <defs>
      <filter
        id="loc-marker_svg__a"
        width={44}
        height={44}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_581_4868"
          stdDeviation={0.5}
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLocMarker;
