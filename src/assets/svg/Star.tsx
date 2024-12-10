
import type { SVGProps } from "react";
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#FFA847"
      d="m4.883 12.615.827-3.542-2.75-2.381 3.622-.313L8 3.038l1.418 3.34 3.62.313-2.75 2.382.828 3.542L8 10.735z"
    />
  </svg>
);
export default SvgStar;
