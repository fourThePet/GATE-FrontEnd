import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { mapStyle } from "../search-bar/index.styles";
import LocMarker from "../../../../assets/svg/LocMarker";
import ReactDOMServer from "react-dom/server";
import {
  GpsButton,
  Research,
  Scissors,
  Hospital,
  Bone,
  Food,
  Coffee,
  Lodging,
  Pill,
  Palette,
  Car,
} from "../../../../assets/svg";
import { mapLocBtn } from "../../index.styles";
import { useGetPlaces } from "../../../../api/places";
// import { useGetPlaces2 } from "../../../../queries";

interface Place {
  category: string;
  latitude: number;
  longitude: number;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: any) => any;
        LatLng: new (lat: number, lng: number) => {
          lat: () => number;
          lng: () => number;
        };
        Marker: new (options: any) => {
          setMap: (map: any | null) => void;
        };
        MarkerImage: new (url: string, size: any, options?: any) => any;
        Size: new (width: number, height: number) => any;
        Point: new (width: number, height: number) => any;
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
      };
    };
  }
}
export default function KakaoMap({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentMarker = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const { places } = useGetPlaces(latitude, longitude) as { places: Place[] };
  // const {data: places} = useGetPlaces2({latitude, longitude})

  const filteredPlaces = useMemo(() => {
    if (selectedCategory === "전체") return places;
    if (selectedCategory === "숙소") {
      return places.filter(
        (place) => place.category === "호텔" || place.category === "펜션"
      );
    }
    if (selectedCategory === "의료") {
      return places.filter(
        (place) => place.category === "병원" || place.category === "약국"
      );
    }
    if (selectedCategory === "문화시설") {
      return places.filter(
        (place) =>
          place.category === "박물관" ||
          place.category === "미술관" ||
          place.category === "문예회관"
      );
    }
    return places.filter((place) => place.category === selectedCategory);
  }, [places, selectedCategory]);

  const initializeMap = (latitude: number, longitude: number) => {
    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    mapInstance.current = map;

    const locMarkerSVG = ReactDOMServer.renderToString(<LocMarker />);
    const icon = new window.kakao.maps.MarkerImage(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(locMarkerSVG)}`,
      new window.kakao.maps.Size(40, 40),
      { offset: new window.kakao.maps.Point(20, 40) }
    );

    currentMarker.current = new window.kakao.maps.Marker({
      position: mapOption.center,
      map,
      image: icon,
    });

    console.log("현재 위치:", { latitude, longitude });
  };

  const getIconBasedOnCategory = (category: string) => {
    if (category === "미용") {
      return <Scissors width={20} height={20} />;
    } else if (category === "병원") {
      return <Hospital width={20} height={20} />;
    } else if (category === "약국") {
      return <Pill width={20} height={20} />;
    } else if (category === "반려동물용품") {
      return <Bone width={20} height={20} />;
    } else if (category === "식당") {
      return <Food width={20} height={20} />;
    } else if (category === "카페") {
      return <Coffee width={20} height={20} />;
    } else if (category === "호텔") {
      return <Lodging width={20} height={20} />;
    } else if (category === "펜션") {
      return <Lodging width={20} height={20} />;
    } else if (category === "박물관") {
      return <Palette width={20} height={20} />;
    } else if (category === "미술관") {
      return <Palette width={20} height={20} />;
    } else if (category === "문예회관") {
      return <Palette width={20} height={20} />;
    } else if (category === "여행지") {
      return <Car width={20} height={20} />;
    } else return <LocMarker width={20} height={20} />;
  };

  const addPlaceMarkers = (places: any[]) => {
    if (!mapInstance.current) return;
    const newMarkers = places.map((place) => {
      const icon = getIconBasedOnCategory(place.category);
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        map: mapInstance.current,
        image: new window.kakao.maps.MarkerImage(
          `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            ReactDOMServer.renderToString(icon)
          )}`,
          new window.kakao.maps.Size(30, 30),
          { offset: new window.kakao.maps.Point(15, 15) }
        ),
      });
      return marker;
    });
    setMarkers(newMarkers);
  };

  const getPlacesData = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get("/api/places", {
        params: { lat: latitude, lng: longitude },
      });
      return response.data;
    } catch {
      throw new Error("장소 데이터를 가져오는 데 실패했습니다.");
    }
  };

  const moveMarkerToMapCenter = () => {
    if (!mapInstance.current || !currentMarker.current) {
      console.error("지도 또는 마커를 찾을 수 없습니다.");
      return;
    }

    const center = mapInstance.current.getCenter();
    currentMarker.current.setPosition(center);

    const latitude = center.getLat();
    const longitude = center.getLng();

    console.log("지도 중심으로 마커 이동", { latitude, longitude });

    // 상태 업데이트
    setLatitude(latitude);
    setLongitude(longitude);

    // 카테고리 선택 초기화 (전체로 설정)
    setSelectedCategory("전체");
  };

  const moveMarkerToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const newPosition = new window.kakao.maps.LatLng(latitude, longitude);

        if (currentMarker.current)
          currentMarker.current.setPosition(newPosition);
        if (mapInstance.current) mapInstance.current.setCenter(newPosition);

        console.log("현재 위치로 마커 이동", { latitude, longitude });

        // 상태 업데이트
        setLatitude(latitude);
        setLongitude(longitude);
        clearMarkers();

        // 장소 데이터 요청 및 콘솔 출력
        getPlacesData(latitude, longitude)
          .then((places) => {
            console.log("현재 위치 이동 후 가져온 장소 데이터:", places);
            addPlaceMarkers(places); // 장소 데이터로 마커 추가
          })
          .catch((error) => {
            console.error("장소 데이터 요청 실패:", error);
          });

        // 카테고리 선택 초기화 (전체로 설정)
        setSelectedCategory("전체");
      },
      (error) => console.error("현재 위치 가져오기 실패:", error)
    );
  };

  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };
  useEffect(() => {
    const loadKakaoMap = () => {
      const existingScript = document.querySelector(
        `script[src^="https://dapi.kakao.com"]`
      );
      if (existingScript) return; // 중복 로드 방지

      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              initializeMap(latitude, longitude);
              setLatitude(latitude);
              setLongitude(longitude);
            },
            (error) => console.error("위치 정보 가져오기 실패:", error)
          );
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
      const existingScript = document.querySelector(
        `script[src^="https://dapi.kakao.com"]`
      );
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  useEffect(() => {
    if (filteredPlaces && filteredPlaces.length > 0) {
      console.log("필터링된 장소 데이터:", filteredPlaces);
      clearMarkers();
      addPlaceMarkers(filteredPlaces);
    } else {
      console.log("선택된 카테고리의 장소 데이터가 없습니다.");
      clearMarkers();
    }
  }, [filteredPlaces]);

  return (
    <div ref={mapRef} css={mapStyle}>
      <div css={mapLocBtn}>
        <GpsButton
          onClick={moveMarkerToCurrentLocation}
          width={60}
          height={60}
        />
        <Research onClick={moveMarkerToMapCenter} width={60} height={60} />
      </div>
    </div>
  );
}
