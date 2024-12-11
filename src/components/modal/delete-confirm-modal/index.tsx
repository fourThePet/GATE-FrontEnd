import ReactModal from "react-modal";
import modalStyles, { buttonStyle, subTitleStyle, wrapper } from "./index.styles";
import { Warning } from "../../../assets/svg";
import Text from "../../text";
import colors from "../../../styles/colors";
import GrayBorderButton from "../../button/gray-border";
import MainPinkButton from "../../button/main-pink";

interface Props {
    isModalOpen : boolean;
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
    title : string;
    subTitle : string;
    handleConfirmButtonClick : () => void;
    closeModal : () => void
}

export default function DeleteConfirmModal({isModalOpen, title, subTitle, handleConfirmButtonClick, closeModal} : Props){
    
    return(
        <ReactModal
            isOpen={isModalOpen} 
            style={modalStyles} 
            onRequestClose={closeModal}
            appElement={document.getElementById("root")} 
        >
            <div css={wrapper}>
                <Warning width={48}/>
                <Text type="Heading3">{title}</Text>
                <div css={subTitleStyle}>
                    <Text type="Label3" color={colors.color.Gray1} >
                        {subTitle}
                    </Text>

                </div>
                <div css={buttonStyle}>
                  <GrayBorderButton width="50%" height="40px" title="취소" onClick={closeModal}/>
                  <MainPinkButton width="50%" height="40px" title="확인" onClick={handleConfirmButtonClick}/>
                </div>
            </div>
            
        </ReactModal>
    )
}