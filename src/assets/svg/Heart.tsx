// //import * as React from "react";
import type { SVGProps } from "react";
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#323232"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4.882 12.956 5.62 6.351a2 2 0 0 0 2.996 0l5.62-6.351c1.673-1.891 2.542-4.269 1.285-6.536-1.452-2.62-4.113-3.156-6.426-1.396a13 13 0 0 0-1.766 1.654.284.284 0 0 1-.422 0 13 13 0 0 0-1.766-1.654C7.71 3.264 5.049 3.8 3.597 6.42c-1.257 2.267-.388 4.645 1.285 6.536Z"
    />
  </svg>
);
export default SvgHeart;
