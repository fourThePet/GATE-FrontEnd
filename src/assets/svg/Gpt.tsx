// //import * as React from "react";
import type { SVGProps } from "react";
const SvgGpt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path fill="url(#gpt_svg__a)" d="M0 0h20v20H0z" />
    <defs>
      <pattern
        id="gpt_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#gpt_svg__b" transform="scale(.02083)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="gpt_svg__b"
        width={48}
        height={48}
      />
    </defs>
  </svg>
);
export default SvgGpt;
