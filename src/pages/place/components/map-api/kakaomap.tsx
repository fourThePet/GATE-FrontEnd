import { useEffect, useRef, useState } from "react";
import { mapStyle } from "../search-bar/index.styles";
import LocMarker from "../../../../assets/svg/LocMarker";
import ReactDOMServer from "react-dom/server";
import { GpsButton, Research } from "../../../../assets/svg";
import { mapLocBtn } from "../../index.styles";
import { useLocationStore } from "../../../../stores/useLocationState";
import { Place } from "../../../../interfaces/places";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getIconBasedOnCategory } from "./categoryIcon";
import { buttonWrapperStyle, tooltipStyle } from "../../index.styles";
import { getPlacesInfo } from "../../../../api";
import OverlayContent from "./overlay-content";
import { createRoot } from "react-dom/client";

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
}: // setSelectedCategory,
KaKaoMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentMarker = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const { setLatitude, setLongitude } = useLocationStore();
  const [searchParams] = useSearchParams();
  // 위치 초기화 버튼 클릭시 URL에 존재하는 현위치 정보 초기화
  const navigate = useNavigate();

  // 현재 열려 있는 오버레이를 추적
  const currentOverlayRef = useRef<kakao.maps.CustomOverlay | null>(null);

  const closeCurrentOverlay = () => {
    if (currentOverlayRef.current) {
      currentOverlayRef.current.setMap(null);
      currentOverlayRef.current = null;
    } else {
    }
  };
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
  };

  const [markerOverlayPairs, setMarkerOverlayPairs] = useState<
    { marker: kakao.maps.Marker; overlay: kakao.maps.CustomOverlay }[]
  >([]);

  const addPlaceMarkers = (places: Place[]) => {
    if (!mapInstance.current) return;

    clearMarkers(); // 기존 마커 제거

    places.forEach((place) => {
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

      window.kakao.maps.event.addListener(marker, "click", async () => {
        try {
          const placeInfo = await getPlacesInfo(place.id);
          if (!placeInfo) return;

          closeCurrentOverlay(); // 기존 오버레이 닫기

          const overlayDiv = document.createElement("div");

          // React 18의 createRoot 사용
          const root = createRoot(overlayDiv);

          root.render(
            <OverlayContent
              placeInfo={placeInfo}
              placeId={placeInfo.id}
              onClose={() => {
                closeCurrentOverlay();
                root.unmount(); // 컴포넌트 언마운트
              }}
              toggleHeart={() => console.log("Toggle Heart")}
              isLiked={placeInfo.favorites === "Y"}
              navigate={navigate}
            />
          );

          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayDiv,
            map: mapInstance.current,
            position: marker.getPosition(),
          });

          currentOverlayRef.current = overlay; // 현재 오버레이 업데이트
          // **지도의 중심을 오버레이의 오른쪽 끝으로 이동**
          if (mapInstance.current) {
            const markerPosition = marker.getPosition();

            // 지도 중심을 오른쪽으로 이동 (지도 중심은 화면 좌표로 이동)
            const projection = mapInstance.current.getProjection();
            const markerPoint = projection.pointFromCoords(markerPosition); // 마커의 화면 좌표
            const overlayOffsetX = 200; // 오버레이의 예상 가로 크기 (픽셀 단위)

            const newPoint = new window.kakao.maps.Point(
              markerPoint.x + overlayOffsetX, // X축으로 이동
              markerPoint.y
            );

            const newCenter = projection.coordsFromPoint(newPoint); // 새 중심 좌표
            mapInstance.current.panTo(newCenter); // 지도 중심 이동
          }
        } catch (error) {
          console.error("Failed to load place info:", error);
        }
      });

      marker.setMap(mapInstance.current); // 지도에 마커 추가
    });
  };

  const clearMarkers = () => {
    markerOverlayPairs.forEach(({ marker, overlay }) => {
      if (marker) {
        marker.setMap(null); // marker가 존재할 때만 setMap 호출
      }
      if (overlay) {
        overlay.setMap(null); // overlay가 존재할 때만 setMap 호출
      }
    });
    setMarkerOverlayPairs([]); // 상태 초기화
  };

  const moveMarkerToMapCenter = () => {
    if (!mapInstance.current || !currentMarker.current) {
      return;
    }

    const center = mapInstance.current.getCenter();
    currentMarker.current.setPosition(center);

    if (mapInstance.current) {
      mapInstance.current.panTo(center);
    }

    const latitude = center.getLat();
    const longitude = center.getLng();

    console.log("지도 중심으로 마커 이동", { latitude, longitude });

    // 상태 업데이트
    setLatitude(latitude);
    setLongitude(longitude);

    // // 카테고리 선택 초기화 (전체로 설정)
    // setSelectedCategory("전체");

    // 검색어(input) 값 초기화
    const searchInput = document.querySelector(
      "input[placeholder='어디로 떠나시나요?']"
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = ""; // 입력 필드 값 초기화
    }

    // URL에서 query 파라미터 제거
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("query"); // query 값 삭제

    // replace: true -  히스토리에 새로운 기록을 남기지 않음.
    navigate(`/place?${queryParams.toString()}`, { replace: true });
  };

  const moveMarkerToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const newPosition = new window.kakao.maps.LatLng(latitude, longitude);

        if (currentMarker.current)
          currentMarker.current.setPosition(newPosition);

        if (mapInstance.current) {
          // 지도 중심을 부드럽게 이동
          mapInstance.current.panTo(newPosition);
        }
        console.log("현재 위치로 마커 이동", { latitude, longitude });

        // 상태 업데이트
        setLatitude(latitude);
        setLongitude(longitude);

        // // 카테고리 선택 초기화 (전체로 설정)
        // setSelectedCategory("전체");
        // 필터 초기화 (replace: true -  히스토리에 새로운 기록을 남기지 않음.)

        // 검색어(input) 값 초기화
        const searchInput = document.querySelector(
          "input[placeholder='어디로 떠나시나요?']"
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.value = ""; // 입력 필드 값 초기화
        }

        // URL에서 query 파라미터 제거
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete("query"); // query 값 삭제

        navigate(`/place?${queryParams.toString()}`, { replace: true });
      },
      (error) => console.error("현재 위치 가져오기 실패:", error)
    );
  };

  const LatLngEqual = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const precision = 6;
    return (
      lat1.toFixed(precision) === lat2.toFixed(precision) &&
      lng1.toFixed(precision) === lng2.toFixed(precision)
    );
  };

  const hideMarker = () => {
    if (!currentMarker.current) return;

    const queryLat = parseFloat(searchParams.get("latitude") || "0");
    const queryLng = parseFloat(searchParams.get("longitude") || "0");

    const markerLat = currentMarker.current.getPosition().getLat();
    const markerLng = currentMarker.current.getPosition().getLng();

    if (LatLngEqual(queryLat, queryLng, markerLat, markerLng)) {
      currentMarker.current.setMap(null);
      console.log("locMarker 숨김 처리 완료");
    } else {
      currentMarker.current.setMap(mapInstance.current);
    }
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
              hideMarker(); // Check if marker should be hidden
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
    hideMarker();
  }, [mapInstance.current, searchParams]);

  useEffect(() => {
    if (places && places.length > 0) {
      console.log(`총 ${places.length}개의 장소 데이터를 조회하였습니다.`);
      addPlaceMarkers(places);

      // 가장 상위 장소의 latitude와 longitude로 지도 중심 이동
      const { latitude, longitude } = places[0];
      if (mapInstance.current) {
        const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
        mapInstance.current.setCenter(newCenter);

        console.log("지도 중심 이동:", { latitude, longitude });
      }
    } else {
      console.log("선택된 카테고리의 장소 데이터가 없습니다.");
      clearMarkers();
    }
  }, [places]);

  return (
    <div ref={mapRef} css={mapStyle} className="kakaoMap">
      <div css={mapLocBtn}>
        <div css={buttonWrapperStyle} className="button-wrapper">
          <GpsButton
            width={60}
            height={60}
            className="gps-button"
            onClick={moveMarkerToCurrentLocation}
          />
          <span css={tooltipStyle} className="tooltip">
            현재 위치로 이동
          </span>
        </div>

        <div css={buttonWrapperStyle} className="button-wrapper">
          <Research width={60} height={60} onClick={moveMarkerToMapCenter} />
          <span css={tooltipStyle} className="tooltip">
            반경 1KM 내 장소 재탐색
          </span>
        </div>
      </div>
    </div>
  );
}
