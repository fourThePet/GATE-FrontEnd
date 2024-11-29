import type { SVGProps } from "react";
const SvgScissors = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#fff"
      d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20"
    />
    <path
      fill="#F1729B"
      d="M20 35c8.284 0 15-6.716 15-15S28.284 5 20 5 5 11.716 5 20s6.716 15 15 15"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.582 17.07 18.8 20m0 0L14 23.6m4.8-3.6 3.86 2.864M18.8 20 14 16.4m12-.6c0 .994-.895 1.8-2 1.8s-2-.806-2-1.8.895-1.8 2-1.8 2 .806 2 1.8m0 8.4c0 .994-.895 1.8-2 1.8s-2-.806-2-1.8.895-1.8 2-1.8 2 .806 2 1.8"
    />
  </svg>
);
export default SvgScissors;
