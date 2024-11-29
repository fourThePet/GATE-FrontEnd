import { useEffect, useRef } from "react";
import { mapStyle } from "../search-bar/index.styles";
import LocMarker from "../../../../assets/svg/LocMarker";
import ReactDOMServer from "react-dom/server";
import { GpsIcon } from "../../../../assets/svg";
import { currentLoc } from "../../index.styles";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: any) => any;
        LatLng: new (lat: number, lng: number) => { lat: number; lng: number };
        Marker: new (options: any) => { setMap: (map: any | null) => void };
        MarkerImage: new (url: string, size: any, options?: any) => any;
        Size: new (width: number, height: number) => {
          width: number;
          height: number;
        };
        Point: new (width: number, height: number) => {
          width: number;
          height: number;
        };
        event: {
          addListener: (
            target: any,
            type: string,
            callback: (event: any) => void
          ) => void;
        };
      };
    };
  }
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const currentMarker = useRef<any>(null); // 현재 마커
  const mapInstance = useRef<any>(null); // 지도 인스턴스

  useEffect(() => {
    const loadKakaoMap = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const mapContainer = mapRef.current;

          const initializeMap = (latitude: number, longitude: number) => {
            if (mapContainer) {
              const mapOption = {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3, // 지도의 확대 레벨
              };

              const map = new window.kakao.maps.Map(mapContainer, mapOption);
              mapInstance.current = map;

              const addMarkerAtClick = (mouseEvent: any) => {
                const clickPosition = mouseEvent.latLng;

                // 이전 마커 제거
                if (currentMarker.current) {
                  currentMarker.current.setMap(null);
                }

                // SVG를 문자열로 변환
                const locMarkerSVG = ReactDOMServer.renderToString(
                  <LocMarker />
                );
                const icon = new window.kakao.maps.MarkerImage(
                  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                    locMarkerSVG
                  )}`,
                  new window.kakao.maps.Size(50, 50),
                  {
                    offset: new window.kakao.maps.Point(25, 50),
                  }
                );

                // 클릭 시 마커 생성
                const marker = new window.kakao.maps.Marker({
                  position: clickPosition,
                  map: map,
                  image: icon,
                });

                // 현재 마커를 업데이트
                currentMarker.current = marker;

                console.log("현재위치: ", {
                  위도: clickPosition.getLat(),
                  경도: clickPosition.getLng(),
                });
              };

              // 지도 클릭 이벤트 등록
              window.kakao.maps.event.addListener(
                map,
                "click",
                addMarkerAtClick
              );
            }
          };

          // 현재 위치 가져오기
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            initializeMap(latitude, longitude);
          });
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMap();

    return () => {
      const existingScript = document.querySelector(
        `script[src^="https://dapi.kakao.com"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // 사용자의 현재 위치로 지도 이동
  const userLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const newCenter = new window.kakao.maps.LatLng(latitude, longitude);
      mapInstance.current.setCenter(newCenter);
    });
  };

  return (
    <>
      <div ref={mapRef} css={mapStyle}>
        <GpsIcon
          onClick={userLocation}
          width={60}
          height={60}
          css={currentLoc}
        />
      </div>
    </>
  );
}
