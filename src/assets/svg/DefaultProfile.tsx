import * as React from "react";
import type { SVGProps } from "react";
const SvgDefaultProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 100 100"
    {...props}
  >
    <rect width={100} height={100} fill="#F2F2F7" rx={50} />
    <path
      fill="#9A9EA6"
      d="m59.083 68.906-2.772-.138a77.4 77.4 0 0 0-13.147.14 10.2 10.2 0 0 1-4.413-.531 6.87 6.87 0 0 1-4.784-5.116c-.691-2.784.227-6.396 3.293-8.067s5.178-4.263 6.98-7.161a11.6 11.6 0 0 1 2.324-2.96 4.72 4.72 0 0 1 5.35-.655 9.7 9.7 0 0 1 2.833 2.49c1.048 1.38 2.097 2.766 3.16 4.141a33.6 33.6 0 0 0 5.273 5.14 8.38 8.38 0 0 1 2.907 5.035 6.02 6.02 0 0 1-3.693 6.748q-.74.32-1.518.531c-.528.15-1.056.244-1.793.403M47.654 34.3c-.848-4.358-4.091-7.394-7.246-6.78-3.154.612-5.024 4.642-4.177 9s4.09 7.394 7.245 6.781c3.154-.613 5.025-4.643 4.178-9.001M34.39 54.705c2.83-.853 4.169-4.712 2.99-8.621-1.177-3.909-4.426-6.386-7.256-5.533s-4.17 4.713-2.991 8.621 4.426 6.386 7.256 5.533M63.347 36.117c.85-4.358-1.018-8.389-4.172-9.004s-6.4 2.42-7.25 6.777 1.02 8.389 4.174 9.004 6.399-2.42 7.248-6.777M72.454 48.75c1.174-3.91-.17-7.769-3-8.619s-6.078 1.631-7.252 5.54c-1.173 3.91.17 7.77 3 8.619 2.832.85 6.078-1.63 7.252-5.54"
    />
  </svg>
);
export default SvgDefaultProfile;