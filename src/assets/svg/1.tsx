import type { SVGProps } from "react";
const Svg1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 30 30"
    {...props}
  >
    <path
      fill="#fff"
      stroke="#D9D9D9"
      d="M29.5 15c0 8.008-6.492 14.5-14.5 14.5S.5 23.008.5 15 6.992.5 15 .5 29.5 6.992 29.5 15Z"
    />
    <path
      fill="#9747FF"
      d="M15 26.25c6.213 0 11.25-5.037 11.25-11.25S21.213 3.75 15 3.75 3.75 8.787 3.75 15 8.787 26.25 15 26.25"
    />
    <mask
      id="1_svg__a"
      width={5}
      height={13}
      x={11.5}
      y={8.5}
      fill="#000"
      maskUnits="userSpaceOnUse"
    >
      <path fill="#fff" d="M11.5 8.5h5v13h-5z" />
      <path d="M15.924 20.5h-1.055v-9.514h-.059l-2.512 1.655v-1.07l2.542-1.676h1.084z" />
    </mask>
    <path
      fill="#fff"
      d="M15.924 20.5h-1.055v-9.514h-.059l-2.512 1.655v-1.07l2.542-1.676h1.084z"
    />
    <path
      fill="#fff"
      d="M15.924 20.5v.5h.5v-.5zm-1.055 0h-.5v.5h.5zm0-9.514h.5v-.5h-.5zm-.059 0v-.5h-.15l-.125.082zm-2.512 1.655h-.5v.928l.775-.51zm0-1.07-.275-.416-.225.148v.269zm2.542-1.676v-.5h-.15l-.126.082zm1.084 0h.5v-.5h-.5zm0 10.105h-1.055v1h1.055zm-.555.5v-9.514h-1V20.5zm-.5-10.014h-.059v1h.06zm-.334.082-2.512 1.656.55.835 2.513-1.656zm-1.737 2.073v-1.07h-1v1.07zm-.224-.652 2.541-1.677-.55-.835-2.542 1.678zm2.266-1.594h1.084v-1H14.84zm.584-.5V20.5h1V9.895z"
      mask="url(#1_svg__a)"
    />
  </svg>
);
export default Svg1;
