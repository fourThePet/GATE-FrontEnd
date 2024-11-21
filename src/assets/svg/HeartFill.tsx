import * as React from "react";
import type { SVGProps } from "react";
const SvgHeartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="#fff" d="M0 0h24v24H0z" />
    <path
      fill="#F1729B"
      fillRule="evenodd"
      d="M5.361 3.47A5.1 5.1 0 0 1 7.5 3c.737 0 1.464.16 2.139.47s1.28.759 1.785 1.318a.777.777 0 0 0 1.152 0C13.598 3.658 15.006 3 16.5 3s2.902.657 3.924 1.788C21.443 5.915 22 7.424 22 8.979s-.557 3.064-1.576 4.192l-6.198 6.858a3 3 0 0 1-4.452 0L3.576 13.17a6 6 0 0 1-1.17-1.936A6.4 6.4 0 0 1 2 8.98c0-.772.137-1.538.406-2.256a6 6 0 0 1 1.17-1.935A5.5 5.5 0 0 1 5.361 3.47"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgHeartFill;
