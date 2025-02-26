import { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import LocMarkerIcons from "./locMarkerIcons";
import colors from "../../../../styles/colors";

interface Place {
  latitude: number;
  longitude: number;
}

interface LineMapComponentProps {
  places: Place[];
  centerLat: number;
  centerLng: number;
}

export default function LineMapComponent({
  places,
  centerLat,
  centerLng,
}: LineMapComponentProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const getSVGComponentByIndex = (index: number) => {
    return LocMarkerIcons[index + 1] || LocMarkerIcons[1];
  };

  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = mapRef.current;
      if (!mapContainer) {
        console.error("지도 컨테이너를 찾을 수 없습니다.");
        return;
      }

      const mapOptions = {
        center: new window.kakao.maps.LatLng(centerLat, centerLng),
        level: 4,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      const bounds = new window.kakao.maps.LatLngBounds();

      const linePath: kakao.maps.LatLng[] = [];

      places.forEach(({ latitude, longitude }, index) => {
        const SVGComponent = getSVGComponentByIndex(index);
        const locMarkerSVG = ReactDOMServer.renderToString(<SVGComponent />);

        const icon = new window.kakao.maps.MarkerImage(
          `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
            locMarkerSVG
          )}`,
          new window.kakao.maps.Size(35, 35),
          { offset: new window.kakao.maps.Point(20, 20) }
        );

        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );

        new window.kakao.maps.Marker({
          position: markerPosition,
          map,
          image: icon,
        });
        bounds.extend(markerPosition);
        linePath.push(markerPosition);
      });

      const polyline = new window.kakao.maps.Polyline({
        path: linePath, // 좌표
        strokeWeight: 4, // 선 두께
        strokeColor: `${colors.color.Black}`, // 선 색깔
        strokeStyle: "shortdash", // 선 스타일
      });

      map.setBounds(bounds);
      polyline.setMap(map);
    };

    const loadMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => {
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(initializeMap);
        } else {
          console.error("카카오 지도 스크립트 로드 실패");
        }
      };
      document.head.appendChild(script);
    };

    if (!window.kakao || !window.kakao.maps) {
      loadMapScript();
    } else {
      initializeMap();
    }
  }, [places, centerLat, centerLng]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
