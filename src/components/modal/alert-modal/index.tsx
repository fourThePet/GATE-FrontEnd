import ReactModal from "react-modal";
import modalStyles, { buttonStyle, closeButton, subTitleStyle, wrapper } from "./index.styles";
import { CloseIcon, Logo } from "../../../assets/svg";
import Text from "../../text";
import colors from "../../../styles/colors";
import MainPinkButton from "../../button/main-pink";

interface Props {
    isModalOpen : boolean;
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
    title : string;
    subTitle : string;
    handleConfirmButtonClick : () => void;
    closeModal : () => void
}

export default function AlertModal({isModalOpen, title, subTitle, handleConfirmButtonClick, closeModal} : Props){
    
    return(
        <ReactModal
            isOpen={isModalOpen} 
            style={modalStyles} 
            appElement={document.getElementById("root")} 
        >
            <div css={wrapper}>
                <div css={closeButton}>
                    <CloseIcon width={8} onClick={closeModal}/>
                </div>
                <Logo width={32}/>
                <Text type="Heading3">{title}</Text>
                <div css={subTitleStyle}>
                    <Text type="Label3" color={colors.color.Gray1} >
                        {subTitle}
                    </Text>

                </div>
                <div css={buttonStyle}>
                  <MainPinkButton height="40px" onClick={handleConfirmButtonClick}>확인</MainPinkButton>
                </div>
            </div>
            
        </ReactModal>
    )
}