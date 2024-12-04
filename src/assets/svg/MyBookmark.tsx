
import type { SVGProps } from "react";
const SvgMyBookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 80 80"
    {...props}
  >
    <path
      fill="#F1729B"
      d="M39.92 0C17.88 0 0 17.88 0 39.92s17.88 39.92 39.92 39.92 39.92-17.88 39.92-39.92S61.96 0 39.92 0m-2.08 63.44V46.88H27.2c-1.48 0-2.48-1.6-1.76-2.92l14.72-28.68c.92-1.88 3.76-1.2 3.76.92v16.76h10.16c1.48 0 2.44 1.56 1.8 2.88L41.64 64.32c-.96 1.92-3.8 1.24-3.8-.88"
    />
  </svg>
);
export default SvgMyBookmark;
