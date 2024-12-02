import * as React from "react";
import type { SVGProps } from "react";
const SvgExtracharge = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#extracharge_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="extracharge_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#extracharge_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="extracharge_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgExtracharge;
