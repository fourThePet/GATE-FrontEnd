/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  Top1,
  Top2,
  Top3,
  Top4,
  Top5,
  Top6,
  Top7,
  Top8,
  Top9,
  Top10,
} from "../../../assets/svg";
import { typo } from "../../../styles/typo";
import {
  wrapperStyle,
  scrollContainerStyle,
  contentContainerStyle,
  imageContainerStyle,
} from "../index.styles";
export default function Best10() {
  const items = [
    <Top1 />,
    <Top2 />,
    <Top3 />,
    <Top4 />,
    <Top5 />,
    <Top6 />,
    <Top7 />,
    <Top8 />,
    <Top9 />,
    <Top10 />,
  ];

  return (
    <div css={wrapperStyle}>
      <h2 css={typo.Heading3}>인기 급상승 🔥</h2>
      <h3 css={typo.Heading4} style={{ color: " #888" }}>
        국내 장소 Best 10
      </h3>
      <ScrollContainer css={scrollContainerStyle} horizontal vertical={false}>
        <div css={contentContainerStyle}>
          {items.map((item, index) => (
            <div key={index} css={imageContainerStyle}>
              {item}
            </div>
          ))}
        </div>
      </ScrollContainer>
    </div>
  );
}
