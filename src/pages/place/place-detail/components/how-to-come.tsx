import { BasicInfoContainer } from "../index.styles";
import { typo } from "../../../../styles/typo";
import { Block } from "../../../../components/block/block";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { LocMarker } from "../../../../assets/svg";
import { Place } from "../../../../interfaces";

interface HowToComeProps {
  place: Place[];
}

export default function HowToCome({ place }: HowToComeProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const latitude = parseFloat(queryParams.get("latitude"));
  const longitude = parseFloat(queryParams.get("longitude"));

  useEffect(() => {
    const loadKakaoMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error("카카오 지도 스크립트 로드 실패");
        return;
      }

      const container = mapRef.current;
      if (!container) return;

      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 2,
      };

      const map = new window.kakao.maps.Map(container, options);

      const locMarkerSVG = ReactDOMServer.renderToString(<LocMarker />);
      const customIcon = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=utf-8,${encodeURIComponent(locMarkerSVG)}`,
        new window.kakao.maps.Size(40, 40),
        { offset: new window.kakao.maps.Point(20, 40) }
      );

      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(latitude, longitude),
        map,
        image: customIcon,
      });
    };
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KAKAO_MAP
      }&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(loadKakaoMap);
      document.head.appendChild(script);
    }
  }, [latitude, longitude]);

  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>장소 정보</h2>
        <div
          css={Block.flexBlock({
            direction: "column",
            width: "100%",
          })}
          style={{ marginTop: "30px", height: "300px" }}
        >
          <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
        </div>
        {place.map((item) => (
          <p key={item.id} css={typo.Label3}>
            {item.roadAddress}
          </p>
        ))}
      </div>
    </>
  );
}
