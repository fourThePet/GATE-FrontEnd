// Size 매핑 객체
export const sizeMap: { [key: string]: string } = {
    SMALL: "소형견",
    MEDIUM: "중형견",
    LARGE: "대형견",
};

// Pet Gender 매핑 객체
export const petGenderMap: { [key: string]: string } = {
    MALE: "남아",
    FEMALE: "여아",
};

export const GenderMap: { [key: string]: string } = {
    MALE: "남자",
    FEMALE: "여자",
};
  
// Size 변환 함수
export const translateSize = (size: string): string => {
    return sizeMap[size] || "알 수 없음"; // 매핑되지 않은 값은 기본값 반환
};

// Gender 변환 함수
export const translateGender = (gender: string): string => {
    return petGenderMap[gender] || "알 수 없음"; // 매핑되지 않은 값은 기본값 반환
};
  

export const iconMap: { [key: string]: string } = {
    식당: "🍴",
    카페: "☕",
    의료: "🏥",
    반려동물용품: "🦴",
    미용: "✂️",
    숙소: "🏡",
    문화시설: "🎨",
    여행지: "🚙",
    전체: "🐾",
}

export const categoryIcon = (name:string): string =>{
    return iconMap[name] || "🐾";
}