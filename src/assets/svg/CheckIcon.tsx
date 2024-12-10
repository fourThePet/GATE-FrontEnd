
import type { SVGProps } from "react";
const SvgCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 33"
    {...props}
  >
    <path
      fill="#F1729B"
      d="M16.5 0a16.5 16.5 0 1 1 0 33 16.5 16.5 0 0 1 0-33"
    />
    <path
      fill="#F1729B"
      d="M16.5 2.063A14.437 14.437 0 1 0 26.71 6.29 14.35 14.35 0 0 0 16.5 2.063M16.5 0a16.5 16.5 0 1 1 0 33 16.5 16.5 0 0 1 0-33"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="m9.922 16.685 4.672 5.6 9.485-10.57"
    />
  </svg>
);
export default SvgCheckIcon;
