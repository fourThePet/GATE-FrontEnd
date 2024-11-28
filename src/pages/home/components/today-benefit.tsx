import Slider from "react-slick";
import { Benefit1, Benefit2, Benefit3, Benefit4 } from "../../../assets/svg";
import { typo } from "../../../styles/typo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  containerStyle,
  sliderContainerStyle,
  imageWrapperStyle,
  imageStyle,
} from "../index.styles";
export default function TodayBenefit() {
  const images = [<Benefit1 />, <Benefit2 />, <Benefit3 />, <Benefit4 />];

  const settings = {
    dots: true, // 하단의 페이징 점 표시
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도 (ms)
    slidesToShow: 1, // 한 번에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어갈 슬라이드 개수
    autoplay: true, // 자동 재생
    autoplaySpeed: 3000, // 자동 전환 속도 (ms)
    arrows: false, // 좌우 화살표 숨기기
  };

  return (
    <div css={containerStyle}>
      <h2 css={typo.Heading3}>오늘의 혜택</h2>
      <div css={sliderContainerStyle}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} css={imageWrapperStyle}>
              <div css={imageStyle}>{image}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
