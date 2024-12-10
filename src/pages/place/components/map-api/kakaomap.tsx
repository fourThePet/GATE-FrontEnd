import { useEffect, useRef, useState } from "react";
import { mapStyle } from "../search-bar/index.styles";
import LocMarker from "../../../../assets/svg/LocMarker";
import ReactDOMServer from "react-dom/server";
import { GpsButton, Research } from "../../../../assets/svg";
import { mapLocBtn } from "../../index.styles";
import { useLocationStore } from "../../../../stores/useLocationState";
import { Place } from "../../../../interfaces/places";
import { useNavigate } from "react-router-dom";
import colors from "../../../../styles/colors";
import { getIconBasedOnCategory } from "./categoryIcon";

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
  const { setLatitude, setLongitude } = useLocationStore();

  // 위치 초기화 버튼 클릭시 URL에 존재하는 현위치 정보 초기화
  const navigate = useNavigate();

  const initializeMap = (latitude: number, longitude: number) => {
    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3, // 기본 레벨
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

    // **줌 컨트롤러 추가**
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    console.log("지도 초기화 완료:", { latitude, longitude });
  };

  const [markerOverlayPairs, setMarkerOverlayPairs] = useState<
    { marker: kakao.maps.Marker; overlay: kakao.maps.CustomOverlay }[]
  >([]);

  const addPlaceMarkers = (places: Place[]) => {
    if (!mapInstance.current) return;

    clearMarkers();

    const newMarkerOverlayPairs = places.map((place) => {
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

      const overlayContent = document.createElement("div");
      overlayContent.style.backgroundColor = "transparent";
      overlayContent.style.border = "none";
      overlayContent.style.fontSize = "12px";
      overlayContent.style.fontWeight = "bold";
      overlayContent.style.color = `${colors.color.Black}`;
      overlayContent.style.textAlign = "center";
      overlayContent.style.whiteSpace = "nowrap";
      overlayContent.style.textShadow = ` 
                                          -1px -1px 0 white,
                                          1px -1px 0 white,
                                          -1px  1px 0 white,
                                          1px  1px 0 white`;
      overlayContent.innerText = place.name;
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        content: overlayContent,
        map: mapInstance.current,
        xAnchor: 0.5,
        yAnchor: 2,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        navigate(
          `/place/detail/${place.id}?latitude=${place.latitude}&longitude=${place.longitude}`,
          {
            replace: false,
            state: { placeId: place.id },
          }
        );
        console.log(`마커 클릭: ${place.id}`);
      });

      return { marker, overlay: customOverlay };
    });

    setMarkerOverlayPairs(newMarkerOverlayPairs);
  };

  const clearMarkers = () => {
    markerOverlayPairs.forEach(({ marker, overlay }) => {
      marker.setMap(null);
      overlay.setMap(null);
    });
    setMarkerOverlayPairs([]);
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

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
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
      script.onerror = () => console.error("카카오 지도 스크립트 로드 실패");
      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (places && places.length > 0) {
      console.log(`총 ${places.length}개의 장소 데이터를 조회하였습니다.`);
      addPlaceMarkers(places);
    } else {
      console.log("선택된 카테고리의 장소 데이터가 없습니다.");
      clearMarkers();
    }
  }, [places]);

  return (
    <div ref={mapRef} css={mapStyle} className="kakaoMap">
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
