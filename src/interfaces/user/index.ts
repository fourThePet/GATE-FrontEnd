export interface UserInfoForm{
    nickName: string,
    birthday: string,
    gender : "MALE" | "FEMALE";
}

export interface PostUsersCheckNicknameBody {
    nickName: string;
}