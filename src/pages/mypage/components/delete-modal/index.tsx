import ReactModal from "react-modal";
import modalStyles, { buttonStyle, subTitle, wrapper } from "./index.styles";
import { Warning } from "../../../../assets/svg";
import { GrayBorderButton, MainPinkButton, Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { useDeleteDogsProfileDogId } from "../../../../queries";
import { notify } from "../../../../utils/constants";

interface Props {
    isDeleteModalOpen : boolean;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
    dogId : number;
    onClose: () => void;
}

export default function DeleteModal({isDeleteModalOpen, setIsDeleteModalOpen, dogId, onClose} : Props){
    
    const { mutate : deleteDogProfile  } = useDeleteDogsProfileDogId()
    const closeModal = () => {
        setIsDeleteModalOpen(false)
    }
    const handleConfirmButtonClick = () =>{ //삭제 로직
        console.log(dogId)
        if(dogId){
            deleteDogProfile(dogId)
            onClose()
            notify({
                type : "success",
                text : "반려견 프로필이 삭제되었어요"
            })
        }
    }
    return(
        <ReactModal 
            isOpen={isDeleteModalOpen} 
            style={modalStyles} 
            onRequestClose={closeModal}
            appElement={document.getElementById("root")} 
        >
            <div css={wrapper}>
                <Warning width={48}/>
                <Text type="Heading3">프로필 삭제</Text>
                <div css={subTitle}>
                    <Text type="Label3" color={colors.color.Gray1} >
                        반려견과 함께한 일정이 등록되어 있다면,
                    </Text>
                    <Text type="Label3" color={colors.color.Gray1} >
                        일정에서 반려견 정보가 사라질 수 있어요.
                    </Text>

                </div>
                <div css={buttonStyle}>
                  <GrayBorderButton width="50%" height="40px" title="취소" onClick={closeModal}/>
                  <MainPinkButton width="50%" height="40px" onClick={handleConfirmButtonClick}>확인</MainPinkButton>
                </div>
            </div>
            
        </ReactModal>
    )
}