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

export interface PlanSearchParam {
  query? : string;
  cityId : number;
  category? : string;
}

// 맵
declare global {
  interface Window {
    kakao: {
      maps: {
        Polyline: new (
          options: kakao.maps.PolylineOptions
        ) => kakao.maps.Polyline;
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: any) => kakao.maps.Map;
        LatLng: new (lat: number, lng: number) => kakao.maps.LatLng;
        Marker: new (options: {
          position: kakao.maps.LatLng;
          map?: kakao.maps.Map;
          image?: kakao.maps.MarkerImage;
        }) => kakao.maps.Marker;
        MarkerImage: new (
          url: string,
          size: kakao.maps.Size,
          options?: {
            offset?: kakao.maps.Point;
          }
        ) => kakao.maps.MarkerImage;
        Size: new (width: number, height: number) => kakao.maps.Size;
        Point: new (x: number, y: number) => kakao.maps.Point;
        CustomOverlay: new (options: {
          position: kakao.maps.LatLng;
          content: HTMLElement | string;
          map?: kakao.maps.Map;
          xAnchor?: number;
          yAnchor?: number;
          zIndex?: number;
          clickable?: boolean;
        }) => kakao.maps.CustomOverlay;
        ZoomControl: new () => kakao.maps.ZoomControl;
        event: {
          addListener: (
            target: any,
            type: string,
            callback: () => void
          ) => void;
          removeListener: (
            target: any,
            type: string,
            callback: () => void
          ) => void;
        };
        ControlPosition: {
          TOP: number;
          LEFT: number;
          RIGHT: number;
          BOTTOM: number;
          TOPLEFT: number;
          TOPRIGHT: number;
          BOTTOMLEFT: number;
          BOTTOMRIGHT: number;
        };
        LatLngBounds: new () => kakao.maps.LatLngBounds;
      };
    };
  }

  namespace kakao.maps {
    interface Map {
      setCenter: (latlng: kakao.maps.LatLng) => void;
      getCenter: () => kakao.maps.LatLng;
      setBounds: (bounds: kakao.maps.LatLngBounds) => void;
      addControl: (control: kakao.maps.ZoomControl, position: number) => void;
    }
    interface LatLng {
      getLat: () => number;
      getLng: () => number;
    }
    interface LatLngBounds {
      extend: (latlng: kakao.maps.LatLng) => void;
      getSouthWest: () => kakao.maps.LatLng;
      getNorthEast: () => kakao.maps.LatLng;
    }
    interface Marker {
      setMap: (map: kakao.maps.Map | null) => void;
      setPosition: (latlng: kakao.maps.LatLng) => void;
      getPosition: () => kakao.maps.LatLng; // getPosition 메서드 추가
    }
    interface MarkerImage {}
    interface Size {}
    interface Point {}
    interface CustomOverlay {
      setMap: (map: kakao.maps.Map | null) => void;
      setPosition: (latlng: kakao.maps.LatLng) => void;
      setContent: (content: HTMLElement | string) => void;
    }

    interface CustomOverlayOptions {
      position: kakao.maps.LatLng;
      content: HTMLElement | string;
      map?: kakao.maps.Map;
      xAnchor?: number;
      yAnchor?: number;
      zIndex?: number;
      clickable?: boolean;
    }
    interface ZoomControl {}

    interface PolylineOptions {
      path: LatLng[];
      strokeWeight?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeStyle?: string;
    }

    interface Polyline {
      setMap: (map: kakao.maps.Map | null) => void;
      setPath: (path: kakao.maps.LatLng[]) => void;
    }

    interface MapOptions {
      center: kakao.maps.LatLng;
      level?: number;
      mapTypeId?: string;
      draggable?: boolean;
      scrollwheel?: boolean;
    }
  }
}

export {};
