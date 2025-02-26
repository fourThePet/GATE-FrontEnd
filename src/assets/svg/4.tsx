import type { SVGProps } from "react";
const Svg4 = (props: SVGProps<SVGSVGElement>) => (
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
      id="4_svg__a"
      width={9}
      height={13}
      x={10}
      y={8.5}
      fill="#000"
      maskUnits="userSpaceOnUse"
    >
      <path fill="#fff" d="M10 8.5h9v13h-9z" />
      <path d="m10.784 17.395 4.841-7.5h.63v1.391h-.469l-3.845 5.955v.08h6.394v.923h-7.551zm5.105.585V9.895h1.003V20.5H15.89z" />
    </mask>
    <path
      fill="#fff"
      d="m10.784 17.395 4.841-7.5h.63v1.391h-.469l-3.845 5.955v.08h6.394v.923h-7.551zm5.105.585V9.895h1.003V20.5H15.89z"
    />
    <path
      fill="#fff"
      d="m10.784 17.395-.42-.272-.08.124v.148zm4.841-7.5v-.5h-.272l-.148.228zm.63 0h.5v-.5h-.5zm0 1.391v.5h.5v-.5zm-.469 0v-.5h-.272l-.148.229zm-3.845 5.955-.42-.271-.08.123v.148zm0 .08h-.5v.5h.5zm6.394 0h.5v-.5h-.5zm0 .923v.5h.5v-.5zm-7.551 0h-.5v.5h.5zm5.105-8.35v-.5h-.5v.5zm1.003 0h.5v-.5h-.5zm0 10.606v.5h.5v-.5zm-1.003 0h-.5v.5h.5zm-4.685-2.834 4.841-7.5-.84-.543-4.841 7.5zm4.421-7.271h.63v-1h-.63zm.13-.5v1.391h1V9.895zm.5.891h-.469v1h.469zm-.889.229-3.845 5.954.84.543 3.845-5.955zm-3.925 6.226v.08h1v-.08zm.5.58h6.394v-1h-6.394zm5.894-.5v.923h1v-.923zm.5.423h-7.551v1h7.551zm-7.051.5v-.85h-1v.85zm5.105-.264v-.395h-1v.395zm0-.395v-7.69h-1v7.69zm-.5-7.19h1.003v-1H15.89zm.503-.5V20.5h1V9.895zm.5 10.105H15.89v1h1.003zm-.503.5v-2.52h-1v2.52z"
      mask="url(#4_svg__a)"
    />
  </svg>
);
export default Svg4;
