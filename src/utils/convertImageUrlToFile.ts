import axios from "axios";

export const convertImageUrlToFile = async (url, fileName) => {
    const response = await axios.get(url, {
        responseType: "blob", 
        withCredentials: false // 크로스 도메인 인증 정보 제외
    });
    return new File([response.data], fileName, { type: response.data.type });
};

