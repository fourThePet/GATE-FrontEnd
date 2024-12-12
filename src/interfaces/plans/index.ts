export interface PlanResponse {
  id: number;
  cityName: string;
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

}
