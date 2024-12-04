
import type { SVGProps } from "react";
const SvgMyBookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <ellipse cx={10} cy={9.806} fill="#F1729B" rx={10} ry={9.806} />
    <path
      fill="#fff"
      d="M10.604 8.074h.895a.76.76 0 0 1 .625.33.73.73 0 0 1 .063.695l-1.98 4.531a.52.52 0 0 1-.239.252.534.534 0 0 1-.648-.13.5.5 0 0 1-.119-.324v-3.393l-.726-.022a.76.76 0 0 1-.514-.224.73.73 0 0 1-.211-.511V6.374c0-.195.079-.382.22-.52a.76.76 0 0 1 .53-.216h1.354c.199 0 .39.078.53.216s.22.325.22.52z"
    />
  </svg>
);
export default SvgMyBookmark;
