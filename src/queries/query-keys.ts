import { PlacesParam, PlanSearchParam } from "../interfaces/places";

export const QUERY_KEYS = {
  POST_MEMBERS_CHECKNICKNAME: ["POST_MEMBERS_CHECKNICKNAME"],
  POST_MEMBERS_SIGNUP: ["POST_MEMBERS_SIGNUP"],
  GET_MEMBERS_INFO: ["GET_MEMBERS_INFO"],
  POST_DOGS_PROFILE: ["POST_DOGS_PROFILE"],
  GET_DOGS_PROFILES: ["GET_DOGS_PROFILES"],
  GET_DOGS_PROFILE_DOGID: (dogId: number) => ["GET_DOGS_PROFILE_DOGID", dogId],
  DELETE_DOGS_PROFILE_DOGID: (dogId: number) => [
    "DELETE_DOGS_PROFILE_DOGID",
    dogId,
  ],
  PUT_DOGS_PROFILE_DOGID: (dogId: number) => ["PUT_DOGS_PROFILE_DOGID", dogId],
  GET_PLACES_INFO: (placeId: number, latitude?: number, longitude?: number) => [
    "GET_PLACES_INFO",
    placeId,
    latitude,
    longitude,
  ],
  GET_PLACES_CATEGORIES: ["GET_PLACES_CATEGORIES"],
  GET_PLACES: (params: PlacesParam) => ["GET_PLACES", params],
  GET_PLACES_BY_SEARCH: (params: any) => ["GET_PLACES_BY_SEARCH", params],
  GET_FAVORITES_LIST: ["GET_FAVORITES_LIST"],
  PATCH_FAVOTIRES: (placeId: number) => ["PATCH_FAVOTIRES", placeId],
  GET_REVIEWS_MY: ["GET_REVIEWS_MY"],
  POST_CREATE_REVIEW: ["POST_CREATE_REVIEW"],
  GET_PLACE_REVIEWS: (placeId: number) => ["placeReviews", placeId] as const,
  GET_PLACES_CITIES: ["GET_PLACES_CITIES"],
  GET_POPULAR_PLACES: (limit: number) => ["GET_POPULAR_PLACES", limit] as const,
  GET_REVIEW_KEYWORDS: (placeId: number) => ["GET_REVIEW_KEYWORDS", placeId],
  GET_REVIEWS_REVIEWID: (reviewId: number) => [
    "GET_REVIEWS_REVIEWID",
    reviewId,
  ],
  GET_REVIEW_SUMMARY: (
    placeId: number,
    type: "POSITIVE" | "NEGATIVE" | "OVERALL"
  ) => ["GET_REVIEW_SUMMARY", placeId, type],
  GET_PLANS_PLANID: (planId: number) => ["GET_PLANS_PLANID", planId],
  GET_PLANS: (dateFilter: "AFTER" | "BEFORE", sortOrder: "ASC" | "DESC") =>
    ["GET_PLANS", dateFilter, sortOrder] as const,
  POST_PLANS: ["POST_PLANS"],
  PUT_PLANS_PLANID: (planId: number) => ["PUT_PLANS_PLANID", planId],
  DELETE_PLANS_PLANID: (planId: number) => ["DELETE_PLANS_PLANID", planId],
  POST_PLANS_ROUTE: ["POST_PLANS_ROUTE"],
  GET_PLACES_PLAN_SEARCH: (params: PlanSearchParam) => [
    "GET_PLACES_PLAN_SEARCH",
    params,
  ],
  POST_MEMBERS_LOGOUT : () => ['POST_MEMBERS_LOGOUT']
} as const;
