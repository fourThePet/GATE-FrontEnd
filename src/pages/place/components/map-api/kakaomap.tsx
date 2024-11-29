import { useEffect, useRef } from "react";
import { mapStyle } from "../search-bar/index.styles";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: any) => any;
        LatLng: {
          new (lat: number, lng: number): { lat: number; lng: number };
        };
      };
    };
  }
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        // 카카오 맵 초기화
        window.kakao.maps.load(() => {
          const mapContainer = mapRef.current;
          if (mapContainer) {
            const mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3, // 지도의 확대 레벨
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            console.log(map);
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
