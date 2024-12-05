export interface PlacesParam {
  latitude: number;
  longitude: number;
  category?: string;
  size?: string;
  entryConditions?: string[];
  types?: string[];
}

export interface Place {
  id: number;
  name: string;
  category: string;
  profileUrl: string;
  latitude: number;
  longitude: number;
  roadAddress: string;
  postalCode: string;
  favorites: "N" | "Y";
}
