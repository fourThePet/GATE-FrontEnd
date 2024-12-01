// //import * as React from "react";
import type { SVGProps } from "react";
const SvgMdogwhite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 68 68"
    {...props}
  >
    <g filter="url(#mdogwhite_svg__a)">
      <rect width={60} height={60} x={4} y={2} fill="#F7F7F7" rx={20} />
    </g>
    <path
      fill="#48484A"
      d="M49.46 22.21c-2.226.037-5.169-.494-6.273-.71-2.162-4.132-8.526-5.748-13.992-3.448C23.597 20.417 16.4 34.717 16.1 35.325a.957.957 0 0 0 .427 1.283.95.95 0 0 0 1.277-.427c1.25-2.502 4.122-7.684 7.104-11.593-.912 4.216-.912 9.401-.776 11.577 0 1.309.856 2.464 2.104 2.84.426.131.871.194 1.318.188 2.503 0 5.62-1.746 7.196-3.733 2.799-3.548-1.743-13.068-2.27-14.143v.001a.947.947 0 0 0-1.217-.322.96.96 0 0 0-.47 1.174c1.791 3.62 4.046 10.128 2.49 12.096-1.714 2.136-4.981 3.382-6.488 2.913-.356-.114-.728-.338-.776-1.127-.284-4.739.276-12.828 2.37-15.265a6.6 6.6 0 0 1 1.548-.953c5.085-2.144 10.395-.238 11.702 2.895a.98.98 0 0 0 .68.564c.168.037 4.154.89 7.168.846.236 0 .4.028.528.462.36 1.392-.751 4.424-2.183 5.198-1.904 1.029-7.089 1.93-8.927 2.191v-.001a.96.96 0 0 0-.73.547c-.121.26-2.943 6.48-4.14 12.32v.002a.951.951 0 0 0 .756 1.122.956.956 0 0 0 1.128-.745c.968-4.727 3.119-9.88 3.793-11.436 1.676-.258 6.838-1.135 9.036-2.32 2.276-1.208 3.69-5.189 3.127-7.366a2.366 2.366 0 0 0-2.414-1.902z"
    />
    <defs>
      <filter
        id="mdogwhite_svg__a"
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
          result="effect1_dropShadow_142_1102"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_142_1102"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgMdogwhite;
