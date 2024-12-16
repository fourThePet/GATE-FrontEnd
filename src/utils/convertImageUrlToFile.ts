import axios from "axios";

// 이미지 URL을 파일로 변환하는 함수
export const convertImageUrlToFile = async (url, fileName) => {
        
    const response = await axios.get(url, { responseType: "blob" });
    return new File([response.data], fileName, { type: response.data.type });
};