import axios from "axios";
import { OCRResponse } from "../../interfaces/ocr";

export const requestOCR = async (
  imageFile: File[]
): Promise<OCRResponse | null> => {
  try {
    if (!imageFile[0]) {
      window.alert("이미지를 업로드해주세요.");
      return null;
    }

    const formData = new FormData();
    const fileName = imageFile[0]?.name || "uploaded_image.jpeg"; // 파일 이름이 없을 경우 기본값 설정

    const message = {
      version: "V2",
      requestId: "test",
      timestamp: new Date().toISOString().replace(/[-:.TZ]/g, ""), // ISO 형식을 적절히 변환
      images: [
        {
          format: "jpeg", // 서버에서 요구하는 파일 포맷
          name: fileName, // 이름 설정
        },
      ],
    };

    formData.append("message", JSON.stringify(message));
    formData.append("file", imageFile[0]);

    console.log("FormData 메시지:", formData.get("message"));
    console.log("FormData 파일:", formData.get("file"));

    const response = await axios.post(
      import.meta.env.VITE_NAVER_OCR_INVOKE_URL || "",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-OCR-SECRET": import.meta.env.VITE_NAVER_X_OCR_SECRET,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("OCR 요청 실패:", error);
    console.error("응답 데이터:", error.response?.data);
    return null;
  }
};
