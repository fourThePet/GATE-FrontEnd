export interface ReviewDataType {
    id : number;
    nickName?: string;
    placeName?: string;
    roadAddress?: string;
    profileUrl? : string;
    starRate? : number;
    receiptCertificate? : boolean;
    content: string;
    fileUrlList : string[];
    size: string;
    keywordList : string[]
    createAt? : string;
    updateAt : string
}

