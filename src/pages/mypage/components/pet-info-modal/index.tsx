import ReactModal from "react-modal";
import modalStyles, { ageWrapper, buttonGroupStyle, buttonStyle, formWrapper, iconWrapper, imageStyle, infoWrapper, radioButtonStyle, sizeWrapper, wrapper } from "./index.styles";
import colors from "../../../../styles/colors";
import { GrayBorderButton, MainPinkButton, Text } from "../../../../components";
import { Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Sdogpink, Sdogwhite } from "../../../../assets/svg";
import { useGetDogsProfileDogId } from "../../../../queries";

interface Props{
    isOpen : boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, // 모달 상태 변경 함수
    dogId : number

}
export default function PetInfoModal({isOpen, setIsOpen, dogId}: Props){
    const {data : dogInfo} = useGetDogsProfileDogId(dogId)
    console.log(dogInfo)
    


    const closeModal = () => {
      setIsOpen(false)
    }
    return (
        <>
            <ReactModal 
              isOpen={isOpen} 
              style={modalStyles} 
              appElement={document.getElementById("layout")} 
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true} // 영역 밖 클릭 시 닫기
            >
              <div css={wrapper}>
                  <Text type="Heading3">{dogInfo?.name}</Text>
                  <div css={imageStyle}>
                      {dogInfo?.imageUrl ? (
                          <img src={dogInfo?.imageUrl} css={imageStyle}/>
                      ) : ( <img src="/images/default_profile.png" css={imageStyle}/>)
                      }
                    
                  </div>
                  <div css={formWrapper}>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >견종크기</Text>
                        </div>
                        <div css={sizeWrapper}>
                            <div css={iconWrapper}>
                                {dogInfo?.size === 'SMALL' ? (
                                    <>
                                        <Sdogpink width={60}/>
                                        <Text type="Label3" color={colors.color.Black} >소형</Text>
                                    </>
                                ) : (
                                    <>
                                        <Sdogwhite width={60}/>
                                        <Text type="Label3" color={colors.color.Gray2} >소형</Text>
                                    </>
                                    
                                )}
                                
                            </div>
                            <div css={iconWrapper}>
                                {dogInfo?.size === 'MEDIUM' ? (
                                        
                                        <>
                                            <Mdogpink width={60}/>
                                            <Text type="Label3" color={colors.color.Black} >중형</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Mdogwhite width={60}/>
                                            <Text type="Label3" color={colors.color.Gray2} >중형</Text>
                                        </>
                                )}
                                
                            </div>
                            <div css={iconWrapper}>
                                {dogInfo?.size === 'LARGE' ? (
                                        <>
                                            <Ldogpink width={60}/>
                                            <Text type="Label3" color={colors.color.Black} >대형</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Ldogwhite width={60}/>
                                            <Text type="Label3" color={colors.color.Gray2} >대형</Text>
                                        </>
                                        
                                )}
                            </div>

                        </div>
                        
                    </div>
                    <div css={infoWrapper} >
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >생일</Text>
                        </div>
                        <div css={ageWrapper}>
                          <Text type="Label2">

                            {dogInfo?.birthDay} {`(만 ${dogInfo?.age}세)`}
                          </Text>
                        </div>
                        
                    </div>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >성별</Text>
                        </div>
                        <div css={buttonGroupStyle}>
                          <label css={radioButtonStyle(dogInfo?.gender === "FEMALE")}>
                                
                                <Text type="Label3">남아</Text>
                          </label>
                        </div>
                    </div>
                </div>
                <div css={buttonStyle}>
                  <GrayBorderButton width="40%" height="32px" title="삭제" onClick={()=> confirm("삭제")}/>
                  <MainPinkButton width="60%" height="32px" title="수정" onClick={()=> confirm("수정")}/>
                </div>
              </div>
            </ReactModal>
        </>
    )
}