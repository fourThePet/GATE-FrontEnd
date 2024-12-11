import { BarLoader } from "react-spinners";
import { Block } from "../../../components/block/block";
import { typo } from "../../../styles/typo";
import { Receiptloading } from "../../../assets/svg";

export default function PlanWaiting() {
  return (
    <div
      css={Block.flexBlock({
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      })}
      style={{ display: "flex", marginTop: "30%" }}
    >
      <Receiptloading width="20%" height="20%" fill="#F1729B" />
      <div
        css={Block.flexBlock({
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        })}
        style={{ display: "flex", marginTop: "80px" }}
      >
        <span css={typo.Heading1}>스타일에 맞는</span>
        <span css={typo.Heading1}>맞춤 일정을</span>
        <span css={typo.Heading1}>준비중입니다.</span>
      </div>

      {/* BarLoader 추가 */}
      <BarLoader
        color="#F1729B"
        width="60%"
        height={8}
        cssOverride={{
          marginTop: "120px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}
