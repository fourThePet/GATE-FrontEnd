import { useState } from "react";
import { Text } from "../../components";
import colors from "../../styles/colors";
import { contentWrapper, iconStyle, infoWrapper, line, loginInfo, myInfoWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import { PlusIcon, WhiteNextIcon } from "../../assets/svg";

export default function Mypage() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [name, setName] = useState("000")
  return (
    <div css={contentWrapper}>
        <div css={wrapper}>
          <div css={loginInfo}>
            {isLogin ? (
              <div css={textWrapper}>
                <Text type="Heading3" color={colors.color.White1}>안녕하세요, {name}님!</Text>
                <Text type="Body2" color={colors.color.White1}>반려견과 함께 행복의 문을 열어보세요!</Text>
              </div>
            ) : (
              <>
                <div css={textWrapper}>
                  <Text type="Heading3" color={colors.color.White1}>로그인을 해주세요</Text>
                  <Text type="Body2" color={colors.color.White1}>반려견과 함께 행복의 문을 열어보세요!</Text>
                </div>
                <div css={iconStyle}>
                  <WhiteNextIcon width={12} height={24}/>
                </div>
              </>
            )
            
          } 
          </div>
          <div css={myInfoWrapper}>
            <div css={infoWrapper}>
              <div css={titleWrapper}>
                <Text type="Heading4">내 강아지 정보</Text>
                <PlusIcon width={10}/>
              </div>
                <hr color={colors.color.Gray5} css={line}/>
            </div>
            <div css={infoWrapper}>
              <Text type="Heading4" css={titleWrapper}>나의 활동</Text>
              <hr color={colors.color.Gray5} css={line}/>
            </div>
            <div css={infoWrapper}>
              <hr color={colors.color.Gray5} css={line}/>
              <Text type="Label3" color={colors.color.Gray2}>로그아웃</Text>
              
            </div>
          </div>
        </div>
    </div>
  )
}
