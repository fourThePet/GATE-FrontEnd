import * as React from "react";
import type { SVGProps } from "react";
const SvgWhitePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 8 8"
    {...props}
  >
    <path
      fill="#fff"
      d="M7.429 4.571H4.57V7.43a.571.571 0 0 1-1.142 0V4.57H.57a.571.571 0 0 1 0-1.142H3.43V.57a.571.571 0 0 1 1.142 0V3.43H7.43a.571.571 0 0 1 0 1.142"
    />
  </svg>
);
export default SvgWhitePlus;
