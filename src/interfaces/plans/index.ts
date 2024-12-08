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
