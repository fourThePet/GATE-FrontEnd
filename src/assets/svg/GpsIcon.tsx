//import * as React from "react";
import type { SVGProps } from "react";
const SvgGpsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 58 58"
    {...props}
  >
    <g filter="url(#gps-icon_svg__a)">
      <circle cx={29} cy={27} r={25} fill="#fff" />
    </g>
    <path
      stroke="#000"
      strokeWidth={2}
      d="M29 36.333a9.333 9.333 0 1 0 0-18.667 9.333 9.333 0 0 0 0 18.667Z"
    />
    <path
      fill="#000"
      stroke="#000"
      strokeWidth={2}
      d="M29 29.667a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M29 17.667V15m9.333 12H41M29 39v-2.667M17 27h2.667"
    />
    <defs>
      <filter
        id="gps-icon_svg__a"
        width={58}
        height={58}
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
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_468_4658"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_468_4658"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgGpsIcon;
