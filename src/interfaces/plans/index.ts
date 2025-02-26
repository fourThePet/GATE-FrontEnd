export interface PlanResponse {
  id: number;
  cityName: string;
  cityPhotoUrl : string
  date: string;
  dogSize: number;
}

export interface PlansApiResponse {
  content: PlanResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface SelectPlaceType{
  placeId: number;
  placeName: string;
  photoUrl: string;
  latitude : number;
  longitude: number;
  roadAddress?:string;
  reviewNum?: number;
  starAvg?:number;

}

export interface PlanRequestBody {
  date : string;
  cityId : number;
  dogIds : number[];
  placeIds : number[];
}

export interface City {
  cityName: string;
  id: number;
  photoUrl: string;
}

export interface PlaceType {
  id: number;
  category: string;
  latitude?: number;
  longitude?: number;
  name: string;
}

export interface PlanPlace {
  id: number ;
  sequence: number;
  place: PlaceType;
}

export interface RecommendPlanResponse {
  date: string;
  id: number;
  city: City;
  planPlaces: PlanPlace[];
}
