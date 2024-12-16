import type { SVGProps } from "react";
const SvgShowmap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#showmap_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="showmap_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#showmap_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="showmap_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgShowmap;
