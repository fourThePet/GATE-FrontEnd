import type { SVGProps } from "react";
const SvgOutdoorav = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#outdoorav_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="outdoorav_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#outdoorav_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="outdoorav_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgOutdoorav;
