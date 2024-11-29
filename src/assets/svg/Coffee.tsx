import type { SVGProps } from "react";
const SvgCoffee = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#fff"
      d="M17.5 24.167h3.333A4.167 4.167 0 0 0 25 20v-.833h.833a2.5 2.5 0 1 0 0-5H25v-.834a.833.833 0 0 0-.833-.833h-10a.833.833 0 0 0-.834.833V20a4.167 4.167 0 0 0 4.167 4.167m7.5-8.334h.833a.833.833 0 0 1 0 1.667H25zm-10-1.666h8.333V20a2.5 2.5 0 0 1-2.5 2.5H17.5A2.5 2.5 0 0 1 15 20zm12.5 11.666h-15a.833.833 0 0 0 0 1.667h15a.833.833 0 1 0 0-1.667"
    />
    <path fill="#fff" d="M14.5 22v-8H24v8l-5.5 1.5z" />
  </svg>
);
export default SvgCoffee;
