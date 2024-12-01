import * as React from "react";
import type { SVGProps } from "react";
const SvgResearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 58 58"
    {...props}
  >
    <g filter="url(#research_svg__a)">
      <circle cx={29} cy={27} r={25} fill="#fff" />
    </g>
    <path
      fill="#000"
      fillRule="evenodd"
      d="m31.58 29.585-1.724 1.956c4.454.261 7.24 1.945 7.24 3.13 0 .875-1.53 2.11-4.44 2.742a1.056 1.056 0 1 0 .421 2.067c3.85-.843 6.129-2.637 6.129-4.81 0-2.495-3.126-4.482-7.627-5.085m-4.12 1.956-1.724-1.956c-4.501.603-7.626 2.59-7.626 5.085 0 2.585 3.364 4.62 8.132 5.148l-.443.432a1.055 1.055 0 0 0 0 1.498 1.057 1.057 0 0 0 1.498 0l2.11-2.11q.144-.152.221-.347a1.06 1.06 0 0 0 0-.802 1.1 1.1 0 0 0-.221-.348l-2.11-2.11a1.06 1.06 0 0 0-1.498 1.498l.127.116c-3.597-.506-5.707-1.92-5.707-2.975 0-1.184 2.786-2.868 7.24-3.13"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      d="M28.658 14.11a8.44 8.44 0 0 0-8.439 8.438c0 5.696 7.437 12.13 7.753 12.404a1.055 1.055 0 0 0 1.371 0c.37-.274 7.753-6.708 7.753-12.404a8.44 8.44 0 0 0-8.438-8.439m0 18.617c-2.247-2.11-6.33-6.656-6.33-10.18a6.329 6.329 0 0 1 12.658 0c0 3.524-4.082 8.08-6.328 10.18m0-14.398a4.22 4.22 0 1 0 0 8.438 4.22 4.22 0 0 0 0-8.438m0 6.328a2.11 2.11 0 1 1 0-4.219 2.11 2.11 0 0 1 0 4.22"
    />
    <defs>
      <filter
        id="research_svg__a"
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
          result="effect1_dropShadow_481_4910"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_481_4910"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgResearch;
