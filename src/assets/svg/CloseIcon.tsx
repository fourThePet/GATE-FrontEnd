import * as React from "react";
import type { SVGProps } from "react";
const SvgCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="#888"
      d="m1.64.557 11.812 11.828a.76.76 0 1 1-1.075 1.075L.567 1.632A.76.76 0 1 1 1.64.557"
    />
    <path
      fill="#888"
      d="M13.447 1.632 1.64 13.462a.759.759 0 1 1-1.074-1.075L12.373.557a.758.758 0 0 1 1.296.537c0 .202-.08.396-.223.538"
    />
  </svg>
);
export default SvgCloseIcon;
