import { PET_SIZE } from "../dogs";

export interface FavoritesListType{
    placeId? : number;
    placeName? : string;
    roadAddress? : string;
    latitude?: number;
    longitude?: number;
    photoUrl?: string;
    reviewNum? : number;
    starAvg?: number;
}

export interface FavoritesParams {
    cityId : number;
    size : PET_SIZE
    
}