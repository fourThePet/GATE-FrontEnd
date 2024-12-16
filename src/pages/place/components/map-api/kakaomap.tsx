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
import colors from "../../../../styles/colors";

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
}: KaKaoMapProps) {
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

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, "click", async () => {
        try {
          const placeInfo = await getPlacesInfo(place.id);

          if (!placeInfo) {
            return;
          }

          // 기존 오버레이 닫기
          closeCurrentOverlay();

          // 오버레이 컨텐츠 생성
          const overlayContent = document.createElement("div");
          overlayContent.className = "custom-overlay wrap";
          overlayContent.style.cssText = `
            position: relative;
            width:100%;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: Arial, sans-serif;
          `;
          overlayContent.innerHTML = `
            <div style="padding: 10px;">
              <div style="
                  font-size: 16px; 
                  font-weight: bold; 
                  color: #333; 
                  display: flex; 
                  justify-content: space-between; 
                  align-items: center;">
                ${placeInfo.name}
                <div 
                  class="close" 
                  style="cursor: pointer; font-size: 14px; color: #999;" 
                  title="닫기"
                >
                  ✖
                </div>
              </div>
              <div style="display: flex; margin-top: 10px; cursor: pointer;">
                <div style="width: 73px; height: 70px; margin-right: 10px;">
                  <img 
                    src="${
                      placeInfo.photoUrl || "https://via.placeholder.com/73x70"
                    }" 
                    alt="${placeInfo.name}" 
                    style="width: 73px; height: 100%; object-fit: cover; border-radius: 5px;"
                  />
                </div>
                <div style="flex: 1; font-size: 12px; color: #666;">
                  <div>${placeInfo.roadAddress || "주소 없음"}</div>
                  <div>${placeInfo.postalCode || "우편번호 없음"}</div>
                  <a 
                    href="${placeInfo.websiteUrl || "#"}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style="color: #007bff; text-decoration: none;"
                  >
                    홈페이지
                  </a>
                </div>
              </div>
            </div>
          `;

          const overlay = new window.kakao.maps.CustomOverlay({
            content: overlayContent,
            map: mapInstance.current,
            position: marker.getPosition() as kakao.maps.LatLng, // 마커 위치
            xAnchor: 0.3, // X축 중앙 정렬
            yAnchor: 1.2, // Y축 마커 바로 위 (1보다 큰 값으로 조정)
          });

          const closeOverlay = () => {
            overlay.setMap(null);
            currentOverlayRef.current = null;
          };

          overlayContent
            .querySelector(".close")
            ?.addEventListener("click", (e) => {
              e.stopPropagation();
              closeOverlay();
            });

          overlayContent.addEventListener("click", () => {
            navigate(
              `/place/detail/${place.id}?latitude=${place.latitude}&longitude=${place.longitude}`,
              {
                replace: false,
                state: { placeId: place.id },
              }
            );
          });

          overlay.setMap(mapInstance.current);
          currentOverlayRef.current = overlay; // **currentOverlayRef 업데이트**
        } catch (error) {}
      });

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
            { offset: new window.kakao.maps.Point(18, 18) }
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

    // 지도 중심 이동
    mapInstance.current.panTo(center);

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
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              initializeMap(
                currentLatitude || latitude,
                currentLongitude || longitude
              );
              setLatitude(currentLatitude || latitude);
              setLongitude(currentLongitude || longitude);
              hideMarker();
            }
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
