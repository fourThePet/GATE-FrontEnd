import * as React from "react";
import type { SVGProps } from "react";
const SvgAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 36 36"
    {...props}
  >
    <g clipPath="url(#add_icon_svg__a)">
      <path
        fill="#F1729B"
        d="M18 3C9.72 3 3 9.72 3 18s6.72 15 15 15 15-6.72 15-15S26.28 3 18 3m6 16.5h-4.5V24c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-4.5H12c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5h4.5V12c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v4.5H24c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5"
      />
      <path
        fill="#fff"
        d="M24 19.5h-4.5V24c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5v-4.5H12c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5h4.5V12c0-.825.675-1.5 1.5-1.5s1.5.675 1.5 1.5v4.5H24c.825 0 1.5.675 1.5 1.5s-.675 1.5-1.5 1.5"
      />
    </g>
    <defs>
      <clipPath id="add_icon_svg__a">
        <path fill="#fff" d="M0 0h36v36H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgAddIcon;
