import { useEffect, useState } from "react";
import { Text } from "../../components";
import colors from "../../styles/colors";
import { contentWrapper, iconStyle, infoWrapper, line, loginInfo, myActiveWrapper, myInfoWrapper, myPetWrapper, myWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import { BlackNextIcon, MyPlaceIcon, MyReviewIcon, PlusIcon, WhiteNextIcon } from "../../assets/svg";
import { EmptyPetCard, PetInfoCard } from "./components";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [name] = useState("000")
  // 토큰 확인 함수
  const checkLoginStatus = () => {
    const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 토큰 확인
    if (accessToken) {
      setIsLoggedIn(true);
      
    } else {
      setIsLoggedIn(false);
    }
  };

  // 컴포넌트 마운트 시 토큰 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <div css={contentWrapper}>
        <div css={wrapper}>
          <div css={loginInfo}>
            {isLoggedIn ? (
                <div css={textWrapper}>
                  <Text type="Heading3" color={colors.color.White1}>안녕하세요, {name}님!</Text>
                  <Text type="Body2" color={colors.color.White1}>반려견과 함께 행복의 문을 열어보세요!</Text>
                </div>
              ) : (
                <>
                  <div css={textWrapper} onClick={()=>navigate('/login')}>
                    <Text type="Heading3" color={colors.color.White1}>로그인을 해주세요</Text>
                    <Text type="Body2" color={colors.color.White1}>반려견과 함께 행복의 문을 열어보세요!</Text>
                  </div>
                  <div css={iconStyle} onClick={()=>navigate('/login')}>
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
                {isLoggedIn && (<PlusIcon width={10}/>)}
                
              </div>
                <hr color={colors.color.Gray5} css={line}/>
                <div css={myPetWrapper}>
                  {isLoggedIn ? (
                      <PetInfoCard/>
                    ) : (
                      <EmptyPetCard/>
                    )
                  
                  }
                    
                </div>
            </div>
            <div css={infoWrapper}>
              <Text type="Heading4" css={titleWrapper}>나의 활동</Text>
              <hr color={colors.color.Gray5} css={line}/>
              <div css={myActiveWrapper}>
                <div css={myWrapper} onClick={()=>navigate('/mypage/bookmark')}>
                  <MyPlaceIcon width={24}/>
                  <Text type="Label1">내 즐겨찾기</Text>
                  <BlackNextIcon width={4}/>
                </div>
                <div css={myWrapper} onClick={()=>navigate('/mypage/review-list')}>
                  <MyReviewIcon width={24}/>
                  <Text type="Label1">내 리뷰내역</Text>
                  <BlackNextIcon width={4}/>
                </div>
              </div>
            </div>
            <div css={infoWrapper}>
              <hr color={colors.color.Gray5} css={line}/>
              <div css={myActiveWrapper}>
                <Text type="Label1" color={colors.color.Gray2}>로그아웃</Text>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
