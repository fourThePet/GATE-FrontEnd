// Size 매핑 객체
export const sizeMap: { [key: string]: string } = {
    SMALL: "소형견",
    MEDIUM: "중형견",
    LARGE: "대형견",
};

// Gender 매핑 객체
export const genderMap: { [key: string]: string } = {
    MALE: "남아",
    FEMALE: "여아",
};
  
// Size 변환 함수
export const translateSize = (size: string): string => {
    return sizeMap[size] || "알 수 없음"; // 매핑되지 않은 값은 기본값 반환
};

// Gender 변환 함수
export const translateGender = (gender: string): string => {
    return genderMap[gender] || "알 수 없음"; // 매핑되지 않은 값은 기본값 반환
};
  