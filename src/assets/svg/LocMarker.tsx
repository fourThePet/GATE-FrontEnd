import type { SVGProps } from "react";
const SvgLocMarker = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 38"
    {...props}
  >
    <path
      fill="#F1729B"
      d="M13 .003C9.622-.072 6.355 1.327 3.918 3.89S.07 9.976 0 13.678a14.3 14.3 0 0 0 1.563 6.509l.434.773 3.832 6.827 5.047 8.991c.217.372.515.678.867.892.353.213.748.327 1.15.33.403.003.8-.104 1.155-.312s.658-.51.88-.878l5.243-9.025 3.832-6.827q.228-.379.434-.773A14.3 14.3 0 0 0 26 13.677c-.071-3.703-1.48-7.222-3.918-9.786S16.378-.072 13 .003"
    />
    <path fill="#fff" d="M13 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16" />
  </svg>
);
export default SvgLocMarker;
