import { PageWrapper } from "../../styles/ui";
import { Block } from "../../components/block/block";
import { Logowithshadow } from "../../assets/svg";
import { typo } from "../../styles/typo";
export default function WriteReview() {
  return (
    <>
      <div css={PageWrapper}>
        <div
          css={Block.flexBlock({
            direction: "row",
            alignItems: "center",
            gap: "40px",
          })}
          style={{ marginTop: "100px", marginLeft: "60px" }}
        >
          <Logowithshadow css={{ width: "200px", height: "200px" }} />
          <span css={typo.Heading2} style={{ fontSize: "25px" }}>
            다녀온 곳의 리뷰를
            <br /> 써보세요 !
          </span>
        </div>
      </div>
    </>
  );
}
