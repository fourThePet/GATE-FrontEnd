import { JSX } from "react";
import {
  Scissors,
  Hospital,
  Pill,
  Bone,
  Food,
  Coffee,
  Lodging,
  Palette,
  Car,
} from "../../../../assets/svg";
import LocMarker from "../../../../assets/svg/LocMarker";
import FavoriteIcon from "../../../../assets/svg/FavoriteIcon"; // 즐겨찾기 아이콘 추가
import ReactDOMServer from "react-dom/server";

export const getIconBasedOnCategory = (
  category: string,
  isFavorite: boolean
): kakao.maps.MarkerImage => {
  const kakao = window.kakao;

  if (isFavorite) {
    return new kakao.maps.MarkerImage(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        renderSVG(<FavoriteIcon width={24} height={24} />)
      )}`,
      new kakao.maps.Size(36, 36),
      { offset: new kakao.maps.Point(18, 36) }
    );
  }

  const defaultMarker = new kakao.maps.MarkerImage(
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      renderSVGBasedOnCategory(category)
    )}`,
    new kakao.maps.Size(36, 36),
    { offset: new kakao.maps.Point(18, 36) }
  );

  return defaultMarker;
};

const renderSVGBasedOnCategory = (category: string): string => {
  switch (category) {
    case "미용":
      return renderSVG(<Scissors width={20} height={20} />);
    case "병원":
      return renderSVG(<Hospital width={20} height={20} />);
    case "약국":
      return renderSVG(<Pill width={20} height={20} />);
    case "반려동물용품":
      return renderSVG(<Bone width={20} height={20} />);
    case "식당":
      return renderSVG(<Food width={20} height={20} />);
    case "카페":
      return renderSVG(<Coffee width={20} height={20} />);
    case "호텔":
    case "펜션":
      return renderSVG(<Lodging width={20} height={20} />);
    case "박물관":
    case "미술관":
    case "문예회관":
      return renderSVG(<Palette width={20} height={20} />);
    case "여행지":
      return renderSVG(<Car width={20} height={20} />);
    default:
      return renderSVG(<LocMarker width={20} height={20} />);
  }
};

const renderSVG = (element: JSX.Element): string =>
  ReactDOMServer.renderToString(element);
