// import * as React from "react";
import type { SVGProps } from "react";
const SvgLdogwhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 68 68"
    {...props}
  >
    <g filter="url(#ldogwhite_svg__a)">
      <rect width={60} height={60} x={4} y={2} fill="#F7F7F7" rx={20} />
    </g>
    <path
      fill="#48484A"
      d="M49.887 28.801c-2.038-.247-5.227-1.434-6.441-1.907-.703-4.374-4.027-5.183-7.444-5.21l-1.077-7.887a.92.92 0 0 0-.565-.727.94.94 0 0 0-.92.119c-3.522 2.688-5.209 8.081-5.676 9.831-5.81 3.244-11.405 13.028-11.644 13.452a.92.92 0 0 0 .352 1.255.934.934 0 0 0 1.265-.351c.053-.098 5.789-10.132 11.239-12.907v-.001a.92.92 0 0 0 .475-.612c0-.058 1.182-4.983 3.875-8.037l.951 6.917v.002a.92.92 0 0 0 .963.797c4.44-.111 6.124.966 6.452 4.11.033.339.25.63.565.761.19.074 4.623 1.895 7.422 2.232.278.032.538.546.472 1.315-.17 1.958-2.58 5.545-10.479 5.139a.92.92 0 0 0-.867.485c-.145.27-3.56 6.666-4.549 11.309a.92.92 0 0 0 .682 1.11q.099.009.199 0a.93.93 0 0 0 .906-.728c.785-3.663 3.308-8.711 4.135-10.314 8.824.256 11.603-4.329 11.804-6.845.154-1.779-.706-3.14-2.095-3.308"
    />
    <defs>
      <filter
        id="ldogwhite_svg__a"
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
          result="effect1_dropShadow_142_1103"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_142_1103"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgLdogwhite;
