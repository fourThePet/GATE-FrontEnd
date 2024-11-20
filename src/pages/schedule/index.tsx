import { Schedulemain } from "../../assets/svg";
import { PageWrapper } from "../../styles/ui";
import { Imgblock, Greeting } from "./index.styles";

import { typo } from "../../styles/typo";
import { Block } from "../../components/block/block";
import { Button } from "../../components/button/button";

export default function Schedule() {
  return (
    <>
      <Imgblock>
        <Schedulemain />
        <div
          css={Block.flexBlock({
            direction: "column",
            padding: "0 60px",
            gap: "225px",
          })}
          className="text-overlay"
        >
          <Greeting
            style={{
              marginTop: "125px",
            }}
          >
            <span css={typo.Body4}>OO 님, 반갑습니다</span>
            <br />
            <span css={typo.Body4}>뭉치와 함께하는 일정을 세워볼까요? 🐾</span>
          </Greeting>
          <button
            css={Button.mainPinkButton({
              isDisabled: false,
              width: "200px",
              height: "50px",
            })}
            onClick={() => {
              // 버튼 클릭 시 동작
            }}
            style={{
              marginTop: "100px",
            }}
          >
            📅 일정 생성하기{" "}
          </button>
        </div>
      </Imgblock>
      <div css={PageWrapper}>
        {/* 이미지와 텍스트를 겹치는 구조 */}
        <div
          css={Block.flexBlock({
            direction: "column",
            padding: "20px",
            gap: "40px",
          })}
        ></div>
      </div>
    </>
  );
}
