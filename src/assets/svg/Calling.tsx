import * as React from "react";
import type { SVGProps } from "react";
const SvgCalling = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#calling_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="calling_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#calling_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="calling_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgCalling;
