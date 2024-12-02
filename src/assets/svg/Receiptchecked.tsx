import * as React from "react";
import type { SVGProps } from "react";
const SvgReceiptchecked = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 39"
    {...props}
  >
    <path
      fill="#F1729B"
      d="M20 39c11.046 0 20-8.73 20-19.5S31.046 0 20 0 0 8.73 0 19.5 8.954 39 20 39"
    />
    <path
      stroke="#F1729B"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20 37.228c10.041 0 18.182-7.937 18.182-17.728 0-9.79-8.14-17.727-18.182-17.727S1.818 9.71 1.818 19.5 9.958 37.228 20 37.228Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={6}
      d="m10.91 19.688 5.663 6.204 11.496-11.71"
    />
  </svg>
);
export default SvgReceiptchecked;
