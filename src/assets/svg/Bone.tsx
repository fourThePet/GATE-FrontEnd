import type { SVGProps } from "react";
const SvgBone = (props: SVGProps<SVGSVGElement>) => (
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
      d="M24.833 15.198c.358-.357.806-.569 1.27-.635zm1.27-.635a2.246 2.246 0 1 1-.706 4.223c-.344-.177-.786-.19-1.06.084l-5.467 5.467c-.274.274-.26.716-.084 1.06a2.247 2.247 0 1 1-4.223.707m11.54-11.54a2.246 2.246 0 1 0-4.223.706c.177.344.19.786-.084 1.06l-5.466 5.466c-.274.274-.716.261-1.061.085a2.246 2.246 0 1 0-.706 4.223m1.27-.636c-.357.358-.805.57-1.27.636z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M24.833 15.198c.358-.357.806-.569 1.27-.635m0 0a2.246 2.246 0 1 1-.706 4.223c-.344-.177-.786-.19-1.06.084l-5.467 5.467c-.274.274-.26.716-.084 1.06a2.247 2.247 0 1 1-4.223.707m11.54-11.54a2.246 2.246 0 1 0-4.223.706c.177.344.19.786-.084 1.06l-5.466 5.466c-.274.274-.716.261-1.061.085a2.246 2.246 0 1 0-.706 4.223m0 0a2.24 2.24 0 0 0 1.27-.636"
    />
  </svg>
);
export default SvgBone;
