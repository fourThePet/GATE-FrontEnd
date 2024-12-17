import * as React from "react";
import type { SVGProps } from "react";
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="url(#share_svg__a)" d="M0 0h24v24H0z" />
    <defs>
      <pattern
        id="share_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#share_svg__b" transform="scale(.04167)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAA0klEQVRIDe1VSQ7CMAysEC+AO/n/E1hOvApOdAY0kRPFWWglJFRLrp14zVRxpulHFFD3Bn6CXwNM/yv4BK4Sk48kzn0v1ewwqvNDyzGzH7FmMcZXSR1VnRxjErszTgG6cNe2nD3ZjTkTLsHdYq5m1GSU3+Bewtwt4BpiC2Ulj0vW9h+UwxfubgWaAG4Q/R9EvNmkOE33n/UqX95g0V2KlckVt4aGrjhKdn4GF180DTsds5H3bdawe/Q48y213Yzodly7tQIsdNRJegpUIXErrWmYATy9eukxRZkcAAAAAElFTkSuQmCC"
        id="share_svg__b"
        width={24}
        height={24}
      />
    </defs>
  </svg>
);
export default SvgShare;
