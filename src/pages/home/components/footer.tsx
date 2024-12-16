import { Logo } from "../../../assets/svg";
import { Block } from "../../../components/block/block";
import { typo } from "../../../styles/typo";

export default function Footer() {
  const companyInfo = [
    { key: "회사명", value: "(주)엘지유플러스" },
    { key: "주소", value: "서울특별시 용산구 한강대로 32" },
    { key: "대표이사", value: "황현식" },
    { key: "사업자등록번호", value: "220-81-39938" },
    { key: "통신판매신고", value: "제2015-서울용산-00481호" },
    { key: "이메일", value: "cs@gate.co.kr" },
    { key: "전화번호", value: "070-4080-0101" },
  ];

  return (
    <div
      css={Block.flexBlock({
        direction: "column",
        padding: "44px 25px 31px 25px",
        // margin: "30px 0 95px 0",
        bgColor: "#ffffff",
        gap: "40px",
        width: "100%",
        height: "346px",
      })}
    >
      {/* 로고와 약관 */}
      <div css={Block.flexBlock({ direction: "column", gap: "20px" })}>
        <Logo width={36} />
        <div css={typo.Body3}>
          이용약관 | <span css={typo.Body3}>개인정보처리방침</span> |{" "}
          <span css={typo.Body3}>위치정보이용약관</span>
        </div>
      </div>

      {/* 회사 정보 */}
      <div css={Block.flexBlock({ width: "300px", gap: "30px" })}>
        {/* 왼쪽: key */}
        <div css={Block.flexBlock({ direction: "column", gap: "10px" })}>
          {companyInfo.map((info, index) => (
            <div key={index} css={typo.Body3}>
              {info.key}
            </div>
          ))}
        </div>

        {/* 오른쪽: value */}
        <div css={Block.flexBlock({ direction: "column", gap: "10px" })}>
          {companyInfo.map((info, index) => (
            <div key={index} css={typo.Body3}>
              {info.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
