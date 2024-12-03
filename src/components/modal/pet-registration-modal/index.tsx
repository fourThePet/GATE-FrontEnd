import ReactModal from "react-modal";
import { CloseIcon } from "../../../assets/svg";
import colors from "../../../styles/colors";
import MainPinkButton from "../../button/main-pink";
import Text from "../../text";
import {  backgroundStyle, closeIcon,  modalStyles, wrapper } from "./index.styles";
import { useNavigate } from "react-router-dom";

interface Props{
    isOpen : boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
}
export default function PetRegistrationModal({isOpen, setIsOpen} : Props){
    const navigate = useNavigate();
    
    const closeModal = () => {
        setIsOpen(false)
    } 
    return (
        <ReactModal
            isOpen={isOpen} 
            style={modalStyles} 
            appElement={document.getElementById("root")} 
            onRequestClose={closeModal}
            shouldCloseOnOverlayClick={true} // 영역 밖 클릭 시 닫기
        >
            <div css={[wrapper, backgroundStyle]}>
                <div css={closeIcon} onClick={closeModal}>
                    <CloseIcon width={12}/>

                </div>
                <Text type="Label3" color={colors.color.Gray1}>30초면 충분!</Text>
                <MainPinkButton title="반려동물 등록하기" onClick={()=>navigate("/mypage/pet-register")}></MainPinkButton>
                
            </div>

        </ReactModal>
    )
}