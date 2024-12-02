import ReactModal from "react-modal";
import modalStyles, { buttonStyle, wrapper } from "./index.styles";
import { Warning } from "../../../../assets/svg";
import { GrayBorderButton, MainPinkButton, Text } from "../../../../components";
import colors from "../../../../styles/colors";
import { useDeleteDogsProfileDogId } from "../../../../queries";

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
                <Text type="Label3" color={colors.color.Gray1}>프로필을 삭제하시겠습니까?</Text>
                <div css={buttonStyle}>
                  <GrayBorderButton width="50%" height="40px" title="취소" onClick={closeModal}/>
                  <MainPinkButton width="50%" height="40px" title="확인" onClick={handleConfirmButtonClick}/>
                </div>
            </div>
            
        </ReactModal>
    )
}