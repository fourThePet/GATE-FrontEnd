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
  keywordId: number;
  content: string;
  keywordCount: number;
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
