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

export const getIconBasedOnCategory = (category: string) => {
  switch (category) {
    case "미용":
      return <Scissors width={20} height={20} />;
    case "병원":
      return <Hospital width={20} height={20} />;
    case "약국":
      return <Pill width={20} height={20} />;
    case "반려동물용품":
      return <Bone width={20} height={20} />;
    case "식당":
      return <Food width={20} height={20} />;
    case "카페":
      return <Coffee width={20} height={20} />;
    case "호텔":
    case "펜션":
      return <Lodging width={20} height={20} />;
    case "박물관":
    case "미술관":
    case "문예회관":
      return <Palette width={20} height={20} />;
    case "여행지":
      return <Car width={20} height={20} />;
    default:
      return <LocMarker width={20} height={20} />;
  }
};
