import type { SVGProps } from "react";
const SvgNoticeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 15 15"
    {...props}
  >
    <path fill="#9A9EA6" d="M7.5 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15" />
    <path
      fill="#fff"
      d="M6.755 11.666h1.703v-5.7H6.755zm.863-6.75a.95.95 0 0 0 1.015-.935.94.94 0 0 0-.63-.885.9.9 0 0 0-.383-.047.94.94 0 0 0-1.026.933.953.953 0 0 0 1.026.934z"
    />
  </svg>
);
export default SvgNoticeIcon;
