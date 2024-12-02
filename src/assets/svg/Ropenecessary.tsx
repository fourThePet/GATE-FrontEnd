import * as React from "react";
import type { SVGProps } from "react";
const SvgRopenecessary = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#ropenecessary_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="ropenecessary_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#ropenecessary_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="ropenecessary_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgRopenecessary;
