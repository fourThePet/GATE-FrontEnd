import { Schedulemain } from "../../assets/svg";
import { PageWrapper, Text, Button, Block, Img } from "../../styles/ui";
import { Imgblock, Greeting, Section } from "./index.styles";

export default function Schedule() {
  return (
    <>
      <Imgblock>
        {/* 배경 이미지 */}
        <Schedulemain />

        {/* 텍스트와 버튼 */}
        <Block.FlexBox
          className="text-overlay"
          direction="column"
          style={{
            padding: "0 60px",
            gap: "225px",
          }}
        >
          <Greeting
            style={{
              marginTop: "125px",
            }}
          >
            <Text.TitleMenu300>OO 님, 반갑습니다</Text.TitleMenu300>
            <br />
            <Text.TitleMenu300>
              뭉치와 함께하는 일정을 세워볼까요? 🐾
            </Text.TitleMenu300>
          </Greeting>
          <Button.Confirm
            cursor="pointer"
            isDisabled={false}
            style={{
              marginTop: "100px",
            }}
          >
            📅 일정 생성하기{" "}
          </Button.Confirm>
        </Block.FlexBox>
      </Imgblock>
      <PageWrapper>
        {/* 이미지와 텍스트를 겹치는 구조 */}

        <Block.FlexBox
          direction="column"
          style={{
            padding: "20px",
            gap: "40px",
          }}
        >
          {/* 여행지 추천 섹션 */}
          <Section>
            <Text.TitleMenu200>🗺️ 여행지 추천</Text.TitleMenu200>
            <Block.FlexBox
              direction="row"
              style={{
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <Button.Confirm cursor="pointer" isDisabled={false}>
                경기도
              </Button.Confirm>
              <Button.Confirm cursor="pointer" isDisabled={false}>
                서울특별시
              </Button.Confirm>
              <Button.Confirm cursor="pointer" isDisabled={false}>
                제주도
              </Button.Confirm>
            </Block.FlexBox>
          </Section>

          {/* 다가오는 여행 섹션 */}
          <Section>
            <Text.TitleMenu200>🌟 다가오는 여행</Text.TitleMenu200>
            <Block.FlexBox
              direction="column"
              style={{
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {/* 첫 번째 여행 아이템 */}
              <Block.FlexBox
                direction="row"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px", // 둥근 모서리
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <Img.AngledIcon
                  src="도쿄.jpg"
                  alt="도쿄 여행"
                  width="50px"
                  height="50px"
                />
                <Block.FlexBox direction="column">
                  <Text.Menu200>도쿄 여행</Text.Menu200>
                  <Text.Menu>2024.11.19 - 1일 1박</Text.Menu>
                </Block.FlexBox>
              </Block.FlexBox>

              {/* 두 번째 여행 아이템 */}
              <Block.FlexBox
                direction="row"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <Img.AngledIcon
                  src="사포로.jpg"
                  alt="사포로 여행"
                  width="50px"
                  height="50px"
                />
                <Block.FlexBox direction="column">
                  <Text.Menu200>사포로 여행</Text.Menu200>
                  <Text.Menu>2024.11.27 - 11.29</Text.Menu>
                </Block.FlexBox>
              </Block.FlexBox>
            </Block.FlexBox>
          </Section>

          {/* 지난 여행 섹션 */}
          <Section>
            <Text.TitleMenu200>📌 지난 여행</Text.TitleMenu200>
            <Block.FlexBox
              direction="column"
              style={{
                gap: "15px",
                marginTop: "10px",
              }}
            >
              {/* 첫 번째 지난 여행 아이템 */}
              <Block.FlexBox
                direction="row"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <Img.AngledIcon
                  src="홍콩.jpg"
                  alt="홍콩 여행"
                  width="50px"
                  height="50px"
                />
                <Block.FlexBox direction="column">
                  <Text.Menu200>홍콩 여행</Text.Menu200>
                  <Text.Menu>2024.3.1 - 2.3</Text.Menu>
                </Block.FlexBox>
              </Block.FlexBox>

              {/* 두 번째 지난 여행 아이템 */}
              <Block.FlexBox
                direction="row"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "10px",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <Img.AngledIcon
                  src="제주도.jpg"
                  alt="제주 여행"
                  width="50px"
                  height="50px"
                />
                <Block.FlexBox direction="column">
                  <Text.Menu200>제주 여행</Text.Menu200>
                  <Text.Menu>2024.6.1 - 6.4</Text.Menu>
                </Block.FlexBox>
              </Block.FlexBox>
            </Block.FlexBox>
          </Section>
        </Block.FlexBox>
      </PageWrapper>
    </>
  );
}
