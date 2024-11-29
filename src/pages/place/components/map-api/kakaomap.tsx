import { useEffect, useRef } from "react";
import { mapStyle } from "../search-bar/index.styles";
import LocMarker from "../../../../assets/svg/LocMarker";
import ReactDOMServer from "react-dom/server";

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
  const currentMarker = useRef<any>(null); // 현재 마커 참조

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          const mapContainer = mapRef.current;
          if (mapContainer) {
            const mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3, // 지도의 확대 레벨
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            const addMarkerAtClick = (mouseEvent: any) => {
              const clickPosition = mouseEvent.latLng;

              // 이전 마커 제거
              if (currentMarker.current) {
                currentMarker.current.setMap(null);
              }

              // SVG를 문자열로 변환
              const locMarkerSVG = ReactDOMServer.renderToString(<LocMarker />);
              const icon = new window.kakao.maps.MarkerImage(
                `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                  locMarkerSVG
                )}`,
                new window.kakao.maps.Size(50, 50),
                {
                  offset: new window.kakao.maps.Point(25, 50), // 마커 중심 위치
                }
              );

              // 클릭한 위치에 새 마커 생성
              const marker = new window.kakao.maps.Marker({
                position: clickPosition,
                map: map,
                image: icon,
              });

              // 현재 마커를 업데이트
              currentMarker.current = marker;
            };

            // 지도 클릭 이벤트 등록
            window.kakao.maps.event.addListener(map, "click", addMarkerAtClick);
          }
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript();

    return () => {
      const existingScript = document.querySelector(
        `script[src^="https://dapi.kakao.com"]`
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return <div ref={mapRef} css={mapStyle} />;
}
