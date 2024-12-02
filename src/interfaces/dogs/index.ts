export type PET_SIZE = "SMALL" | "MEDIUM" | "LARGE";
export type PET_GENDER = "MALE" | "FEMALE";

export interface ProfileSaveType {
    name : string,
    size : PET_SIZE,
    birthDay : string,
    gender : PET_GENDER
}

export interface DogsInfoType {
    age: number,
    birthDay : string,
    gender: PET_GENDER
    id: string,
    imageUrl : string,
    name : string,
    size : PET_SIZE
}