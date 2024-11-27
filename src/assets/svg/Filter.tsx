import type { SVGProps } from "react";
const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width="120%"
    height="120%"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      className="filterIconStyle"
      fill="#F1729B"
      d="M9 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3 3 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2.83 0a3 3 0 0 1 5.66 0H19a1 1 0 0 1 0 2h-1.17a3 3 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2.83 0a3 3 0 0 1 5.66 0H19a1 1 0 0 1 0 2h-7.17a3 3 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
    />
  </svg>
);
export default SvgFilter;
