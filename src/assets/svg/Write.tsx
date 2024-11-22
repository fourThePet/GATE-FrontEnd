import * as React from "react";
import type { SVGProps } from "react";
const SvgWrite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path fill="#fff" d="M0 0h40v40H0z" />
    <path
      fill="#000"
      d="M8.333 30H15.4a1.67 1.67 0 0 0 1.183-.483l11.534-11.55 4.733-4.634a1.666 1.666 0 0 0 0-2.366l-7.067-7.15a1.667 1.667 0 0 0-2.366 0l-4.7 4.716L7.15 20.083a1.67 1.67 0 0 0-.483 1.184v7.066A1.667 1.667 0 0 0 8.333 30M24.6 7.35l4.717 4.717-2.367 2.366-4.717-4.716zM10 21.95l9.883-9.883 4.717 4.716-9.883 9.884H10zm25 11.383H5a1.667 1.667 0 0 0 0 3.334h30a1.667 1.667 0 0 0 0-3.334"
    />
  </svg>
);
export default SvgWrite;
