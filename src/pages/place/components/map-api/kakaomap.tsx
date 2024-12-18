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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import colors from "../../../../styles/colors";
interface KaKaoMapProps {
  places: Place[];

  // 현재 보고있는 위치
  currentLatitude?: number;
  currentLongitude?: number;

  setSelectedCategory: (category: string) => void;
}

export default function KakaoMap({ places }: KaKaoMapProps) {
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
      { offset: new window.kakao.maps.Point(18, 18) }
    );

    // 항상 locMarker 생성
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
    const queryClient = new QueryClient(); // QueryClient 생성

    if (!mapInstance.current) return;

    clearMarkers();

    const newMarkerOverlayPairs = places.map((place) => {
      const icon = getIconBasedOnCategory(
        place.category,
        place.favorites === "Y"
      );

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
        map: mapInstance.current,
        image: icon,
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
        yAnchor: 3.5,
      });

      window.kakao.maps.event.addListener(marker, "click", async () => {
        try {
          const placeInfo = await getPlacesInfo(place.id);
          if (!placeInfo) return;

          closeCurrentOverlay();

          const overlayDiv = document.createElement("div");

          const root = createRoot(overlayDiv);
          root.render(
            <QueryClientProvider client={queryClient}>
              <OverlayContent
                placeInfo={placeInfo}
                placeId={placeInfo.id}
                onClose={() => {
                  closeCurrentOverlay();
                  root.unmount();
                }}
                navigate={navigate}
              />
            </QueryClientProvider>
          );

          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayDiv,
            map: mapInstance.current,
            position: marker.getPosition(),
          });

          currentOverlayRef.current = overlay; // 현재 오버레이 업데이트

          // **지도 중심 좌표 보정 로직 추가**
          if (mapInstance.current) {
            const markerPosition = marker.getPosition();
            const projection = mapInstance.current.getProjection();

            // 마커의 현재 화면 좌표 계산
            const screenPoint = projection.pointFromCoords(markerPosition);

            // 화면 크기 확인 후 보정할 X, Y 좌표 값 설정
            const offsetX = window.innerWidth <= 480 ? 160 : 210; // 작은 화면일 경우 X축 이동 없음
            const offsetY = 100; // Y축 상단으로 약간 이동 (오버레이 상단이 잘리는 것을 방지)

            const adjustedPoint = new window.kakao.maps.Point(
              screenPoint.x + offsetX,
              screenPoint.y + offsetY
            );

            // 보정된 좌표를 기반으로 지도 중심 이동
            const adjustedCenter = projection.coordsFromPoint(adjustedPoint);
            mapInstance.current.panTo(adjustedCenter);
          }
        } catch (error) {
          console.error("Failed to load place info:", error);
        }
      });

      marker.setMap(mapInstance.current); // 지도에 마커 추가
      return { marker, overlay: customOverlay };
    });
    setMarkerOverlayPairs(newMarkerOverlayPairs);
  };

  const clearMarkers = () => {
    markerOverlayPairs.forEach(({ marker, overlay }) => {
      if (marker) {
        marker.setMap(null);
      }
      if (overlay) {
        overlay.setMap(null);
      }
    });
    setMarkerOverlayPairs([]);
  };

  const moveMarkerToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const newPosition = new window.kakao.maps.LatLng(latitude, longitude);

        // 지도 중심 이동
        if (mapInstance.current) {
          mapInstance.current.panTo(newPosition); // 부드럽게 중심 이동
        }

        // locMarker 위치 업데이트
        if (currentMarker.current) {
          currentMarker.current.setPosition(newPosition);
        } else if (mapInstance.current) {
          const locMarkerSVG = ReactDOMServer.renderToString(<LocMarker />);
          const icon = new window.kakao.maps.MarkerImage(
            `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              locMarkerSVG
            )}`,
            new window.kakao.maps.Size(40, 40),
            { offset: new window.kakao.maps.Point(20, 20) }
          );
          currentMarker.current = new window.kakao.maps.Marker({
            position: newPosition,
            map: mapInstance.current,
            image: icon,
          });
        }

        // 상태 업데이트
        setLatitude(latitude);
        setLongitude(longitude);

        // 쿼리스트링 값 제거
        navigate(`/place`, { replace: true }); // 기본 URL로 이동
      }
    );
  };

  const moveMarkerToMapCenter = () => {
    if (!mapInstance.current) return;

    // 지도 중심 좌표 가져오기
    const center = mapInstance.current.getCenter();
    currentMarker.current.setPosition(center);

    // 지도 중심 이동
    if (mapInstance.current) {
      mapInstance.current.panTo(center);
    }
    const latitude = center.getLat();
    const longitude = center.getLng();

    // 상태 업데이트
    setLatitude(latitude);
    setLongitude(longitude);

    // locMarker는 항상 사용자 위치에 유지
    if (currentMarker.current) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: userLat, longitude: userLng } }) => {
          currentMarker.current.setPosition(
            new window.kakao.maps.LatLng(userLat, userLng)
          );
        }
      );
    }

    // 검색어(input) 값 초기화
    const searchInput = document.querySelector(
      "input[placeholder='어디로 떠나시나요?']"
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.value = "";
    }

    // URL에서 query 파라미터 제거
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete("query"); // query 값 삭제

    // replace: true - 히스토리에 새로운 기록을 남기지 않음.
    navigate(`/place?${queryParams.toString()}`, { replace: true });
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
          const { latitude: storedLatitude, longitude: storedLongitude } =
            useLocationStore.getState();
          if (storedLatitude && storedLongitude) {
            initializeMap(storedLatitude, storedLongitude);
            setLatitude(storedLatitude);
            setLongitude(storedLongitude);
          } else {
            navigator.geolocation.getCurrentPosition(
              ({ coords: { latitude, longitude } }) => {
                initializeMap(latitude, longitude);
                setLatitude(latitude);
                setLongitude(longitude);
              },
              (error) => {
                console.error("위치 정보를 가져올 수 없습니다:", error);
              },
              { enableHighAccuracy: false, timeout: 5000 }
            );
          }
        });
      };

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
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const category = queryParams.get("category");

    if (places && places.length > 0) {
      addPlaceMarkers(places);

      // 검색어 또는 특정 카테고리가 있을 경우에만 지도 중심 이동
      if (query || (category && category !== "전체")) {
        const { latitude, longitude } = places[0];
        if (mapInstance.current) {
          const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
          mapInstance.current.setCenter(newCenter);
        }
      }
    } else {
      clearMarkers();
    }
  }, [places, location.search]);

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
