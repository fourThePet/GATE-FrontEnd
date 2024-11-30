
import type { SVGProps } from "react";
const SvgGrayPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 33 33"
    {...props}
  >
    <circle cx={16.5} cy={16.5} r={16.5} fill="#DDD" />
    <path
      fill="#888"
      d="M21.656 17.357H17.36v4.297a.86.86 0 0 1-1.718 0v-4.297h-4.297a.859.859 0 1 1 0-1.718h4.297v-4.297a.86.86 0 0 1 1.718 0v4.297h4.297a.859.859 0 1 1 0 1.718"
    />
  </svg>
);
export default SvgGrayPlusIcon;
