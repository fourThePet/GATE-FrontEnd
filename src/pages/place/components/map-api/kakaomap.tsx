import { useEffect, useRef, useState } from "react";
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
import { useLocationStore } from "../../../../stores/useLocationState";
import { Place } from "../../../../interfaces/places";
import { useNavigate } from "react-router-dom";
// import { useGetPlaces2 } from "../../../../queries";

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

interface KaKaoMapProps {
  places: Place[];

  // 현재 보고있는 위치
  currentLatitude?: number;
  currentLongitude?: number;

  setSelectedCategory: (category: string) => void;
}

export default function KakaoMap({
  places,
  currentLatitude,
  currentLongitude,
  setSelectedCategory,
}: KaKaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentMarker = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const { setLatitude, setLongitude } = useLocationStore(); // Zustand 사용

  // 위치 초기화 버튼 클릭시 URL에 존재하는 현위치 정보 초기화
  const navigate = useNavigate();
  // const {data: places} = useGetPlaces2({latitude, longitude})

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

  const addPlaceMarkers = (places: Place[]) => {
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

    // 필터 초기화
    // replace: true -  히스토리에 새로운 기록을 남기지 않음.
    navigate("/place", { replace: true });
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

        // 카테고리 선택 초기화 (전체로 설정)
        setSelectedCategory("전체");
        // 필터 초기화 (replace: true -  히스토리에 새로운 기록을 남기지 않음.)
        navigate("/place", { replace: true });
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
              // 이미 위치 정보가 존재한다면 현 위치가 아닌, 해당 위치 정보 기반으로 위경도 설정
              initializeMap(
                currentLatitude || latitude,
                currentLongitude || longitude
              );
              setLatitude(currentLatitude || latitude);
              setLongitude(currentLongitude || longitude);
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
    if (places && places.length > 0) {
      console.log(`총 ${places.length}개의 장소 데이터를 조회하였습니다.`);
      clearMarkers();
      addPlaceMarkers(places);
    } else {
      console.log("선택된 카테고리의 장소 데이터가 없습니다.");
      clearMarkers();
    }
  }, [places]);

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
