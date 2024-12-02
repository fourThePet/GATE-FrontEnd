import * as React from "react";
import type { SVGProps } from "react";
const SvgParkingavailabe = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <path fill="url(#parkingavailabe_svg__a)" d="M0 0h64v64H0z" />
    <defs>
      <pattern
        id="parkingavailabe_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#parkingavailabe_svg__b" transform="scale(.01563)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="parkingavailabe_svg__b"
        width={64}
        height={64}
      />
    </defs>
  </svg>
);
export default SvgParkingavailabe;
