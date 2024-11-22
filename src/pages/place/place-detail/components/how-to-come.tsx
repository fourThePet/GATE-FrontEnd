import { BasicInfoContainer } from "../index.styles";
import { typo } from "../../../../styles/typo";
import { Block } from "../../../../components/block/block";
import { Mapex } from "../../../../assets/svg";
export default function HowToCome() {
  return (
    <>
      <div css={BasicInfoContainer} style={{ marginTop: "-20px" }}>
        <h2 css={typo.Heading3}>찾아오는 길</h2>
        <div
          css={Block.flexBlock({
            direction: "column",
            width: "100%",
          })}
          style={{ marginTop: "30px" }}
        >
          <Mapex
            css={Block.flexBlock({
              width: "100%",
              height: "auto",
            })}
          />
        </div>
        <p css={typo.Label3}>서울특별시 강남구 대치4동 916-38</p>
      </div>
    </>
  );
}
