export interface OCRField {
  inferText?: string; // OCR 분석 결과 텍스트
  inferConfidence?: number; // OCR 분석 신뢰도
  valueType?: string; // 필드 값 유형
  boundingPoly?: {
    vertices: { x: number; y: number }[]; // 좌표 정보
  };
  type?: string; // 필드 타입
}

export interface OCRImage {
  inferResult?: string; // OCR 결과 상태 (e.g., SUCCESS, FAILURE)
  message?: string; // OCR 결과 메시지
  fields?: OCRField[]; // OCR 분석된 필드 리스트
  receipt?: {
    result?: string; // 기존 receipt 관련 데이터
  };
}

export interface OCRResponse {
  version: string;
  requestId: string;
  timestamp: number;
  images: OCRImage[]; // images 배열에 대한 타입 정의
}
