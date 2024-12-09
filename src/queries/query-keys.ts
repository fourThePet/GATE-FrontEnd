import { PlacesParam } from "../interfaces/places";

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
  GET_PLACES_INFO: (placeId: number) => ["GET_PLACES_INFO", placeId],
  GET_PLACES_CATEGORIES: ["GET_PLACES_CATEGORIES"],
  GET_PLACES: (params: PlacesParam) => ["GET_PLACES", params],
  GET_FAVORITES_LIST: ["GET_FAVORITES_LIST"],
  PATCH_FAVOTIRES: (placeId: number) => ["PATCH_FAVOTIRES", placeId],
  GET_REVIEWS_MY: ["GET_REVIEWS_MY"],
  POST_CREATE_REVIEW: ["POST_CREATE_REVIEW"],
  GET_PLACE_REVIEWS: (placeId: number) => ["placeReviews", placeId] as const,
  GET_PLACES_CITIES: ["GET_PLACES_CITIES"], // 지역 리스트 조회 키
  GET_REVIEW_KEYWORDS: (placeId: number) => ["GET_REVIEW_KEYWORDS", placeId],
  GET_REVIEWS_REVIEWID: (reviewId: number) => [
    "GET_REVIEWS_REVIEWID",
    reviewId,
  ],
  GET_PLAN_PLANID: (planId: number) => ["GET_PLAN_PLANID", planId],
  GET_PLANS: (dateFilter: "AFTER" | "BEFORE", sortOrder: "ASC" | "DESC") =>
    ["GET_PLANS", dateFilter, sortOrder] as const,
  POST_CREATE_PLAN: ["POST_CREATE_PLAN"],
} as const;
