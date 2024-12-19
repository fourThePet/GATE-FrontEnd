import { useState } from "react";
import { AlertModal, LoadingBar, Text } from "../../components";
import colors from "../../styles/colors";
import { blurBackground, contentWrapper, iconStyle, infoWrapper, line, loginInfo, myActiveWrapper, myInfoWrapper, myPetWrapper, myWrapper, textWrapper, titleWrapper, wrapper } from "./index.styles";
import { BlackNextIcon, MyPlaceIcon, MyReviewIcon, PlusIcon, WhiteNextIcon } from "../../assets/svg";
import { EmptyPetCard, PetInfoCard, PetInfoModal } from "./components";
import { useNavigate } from "react-router-dom";
import { useGetDogsProfiles, useGetMembersInfo, usePostMembersLogout } from "../../queries";
import { useAuthStore } from "../../stores/useAuthStore";
import usePageMeta from "../../utils/usePageMeta";
import { notify } from "../../utils/constants";
// import { notify } from "../../utils/constants";



export default function Mypage() {
  usePageMeta("GATE | 마이페이지", 'GATE 마이페이지'); //seo 검색 최적화
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean|null>(false)
  const { isLoggedIn, 
    // logout 
  } = useAuthStore();
  const { data : memberInfo, isLoading:isMemberLoading} = useGetMembersInfo();
  const { data : dogsInfo, isLoading: isDogsLoading } = useGetDogsProfiles();
  const [ dogId, setDogId ] = useState<number>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(!isLoggedIn); // 로그인 여부에 따라 모달 열기

  const { mutate : logout} = usePostMembersLogout()

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    localStorage.setItem("pathname", window.location.pathname)
    navigate("/login", { state: { from: window.location.pathname } }); // 로그인 페이지로 이동
  };

  const handlePetInfoClcik = (id : number) => {
    setDogId(id)
    setIsModalOpen(true)
  }
  

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true); // 로그아웃 버튼 클릭 시 모달 열기
  };

  const handleConfirmButtonClick = () => {
    logout(); // 로그아웃 실행
    // notify({
    //   type : "success",
    //   text : "로그아웃 되었습니다"
    // })
    // navigate("/", { replace: true }); // 홈으로 이동
    setIsLogoutModalOpen(false); // 모달 닫기
  };

  const closeModal = () => {
    setIsLogoutModalOpen(false); // 모달 닫기
  };

  const moveBookmark = () => {
    if(!isLoggedIn){
      notify({
        type : "error",
        text : "로그인이 필요해요"
      })
      navigate("/login")
    }else{
      navigate('/mypage/bookmark')
    }
  }

  const moveReview = () => {
    if(!isLoggedIn){
      notify({
        type : "error",
        text : "로그인이 필요해요"
      })
      navigate("/login")
    }else{
      navigate('/mypage/review-list')
    }
  }
  
  if(isDogsLoading || isMemberLoading){return(<LoadingBar/>)}

  return (
    <div css={[contentWrapper, isLoginModalOpen && blurBackground]}>
        {isLoginModalOpen && (
          <AlertModal
            isModalOpen={isLoginModalOpen}
            title="로그인 필요"
            subTitle="로그인 후 이용할 수 있는 서비스입니다."
            handleConfirmButtonClick={handleCloseLoginModal}
            closeModal={() => setIsLoginModalOpen(false)}
          />
        )}
        <div css={wrapper}>
          <div css={loginInfo}>
            {isLoggedIn ? (
                <div css={textWrapper}>
                  <Text type="Heading3" color={colors.color.White1}>안녕하세요, {memberInfo?.nickname || "게스트"}님!</Text>
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
                {isLoggedIn && dogsInfo.length > 0 && (<PlusIcon width={10} onClick={()=> navigate('/mypage/pet-register')}/>)}   
              </div>
                <hr color={colors.color.Gray5} css={line}/>
                <div css={myPetWrapper}>
                {isLoggedIn ? (
                  dogsInfo?.length > 0 ? ( // dogsInfo가 배열이고 길이가 0보다 클 때만 렌더링
                    dogsInfo.map((dog) => (
                      <PetInfoCard
                        key={dog.id}
                        name={dog.name}
                        age={dog.age}
                        birthDay={dog.birthDay}
                        imageUrl={dog.imageUrl}
                        size={dog.size}
                        gender={dog.gender}
                        id={dog.id}
                        onClick={() =>handlePetInfoClcik(dog.id)}
                      />
                    ))
                  ) : (
                    <EmptyPetCard onClick={()=> navigate('/mypage/pet-register')}/> // dogsInfo가 비어 있으면 EmptyPetCard 렌더링
                  )
                ) : (
                  <EmptyPetCard onClick={()=>navigate('/login')}/> // 로그인하지 않은 경우 EmptyPetCard 렌더링
                )}
                    
                </div>
            </div>
            <div css={infoWrapper}>
              <Text type="Heading4" css={titleWrapper}>나의 활동</Text>
              <hr color={colors.color.Gray5} css={line}/>
              <div css={myActiveWrapper}>
                <div css={myWrapper} onClick={moveBookmark}>
                  <MyPlaceIcon width={24}/>
                  <Text type="Label1">내 즐겨찾기</Text>
                  <BlackNextIcon width={4}/>
                </div>
                <div css={myWrapper} onClick={moveReview}>
                  <MyReviewIcon width={24}/>
                  <Text type="Label1">내 리뷰내역</Text>
                  <BlackNextIcon width={4}/>
                </div>
              </div>
            </div>
            <div css={infoWrapper}>
              <hr color={colors.color.Gray5} css={line}/>
              <div css={myActiveWrapper}>
                {isLoggedIn ? (
                    <Text type="Label1" color={colors.color.Gray2} onClick={handleLogoutClick}>로그아웃</Text>
                    
                  ) : (
                    <Text type="Label1" color={colors.color.Gray2} onClick={()=>navigate('/login')}>로그인</Text>
                  )
                }
                
              </div>
            </div>
          </div>
          <AlertModal
            isModalOpen={isLogoutModalOpen}
            title="로그아웃"
            subTitle="정말로 로그아웃하시겠습니까?"
            handleConfirmButtonClick={handleConfirmButtonClick}
            closeModal={closeModal}
          />
          {isModalOpen &&
            <PetInfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} dogId={dogId}/>
          }
        </div>
    </div>
  )
}
