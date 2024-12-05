export interface ReviewDataType {
  id: number;
  nickName?: string;
  placeName?: string;
  roadAddress?: string;
  profileUrl?: string;
  starRate?: number;
  receiptCertificate?: boolean;
  content: string;
  fileUrlList: string[];
  size: string;
  keywordList: string[];
  createAt?: string;
  updateAt: string;
}

export interface ReviewKeyword {
  id: number; // 키워드 ID
  content: string; // 키워드 내용
  keywordCount?: number; // 선택적 키워드 개수
}

export interface ReviewResponse {
  id: number;
  nickName: string;
  profileUrl: string;
  starRate: number;
  receiptCertificate: boolean;
  content: string;
  fileUrlList: string[];
  size: "SMALL" | "MEDIUM" | "LARGE";
  keywordList: string[];
  createAt: string;
  updateAt: string;
}

export interface PlaceReviewResponse {
  starRateAvg: number;
  reviewCount: number;
  keywordResponseList: ReviewKeyword[];
  reviewResponseList: ReviewResponse[];
}

export interface ReviewProps {
  placeId: number; // placeId를 props로 받음
}
