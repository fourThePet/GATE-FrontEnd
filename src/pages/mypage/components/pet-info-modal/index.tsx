import ReactModal from "react-modal";
interface Props {
    isOpen : boolean,
    setIsOpen? : () => void
}
export default function PetInfoModal({isOpen}: Props){
    return (
        <>
            <ReactModal isOpen={isOpen}
            style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.7)", // 배경 오버레이를 어둡게 설정
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000, // 오버레이가 항상 최상위에 위치하도록 설정
                },
                content: {
                  position: "relative",
                  width: "320px",
                  height: "280px",
                  margin: "auto",
                  padding: "20px",
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  overflow: "hidden",
                },
              }}>
                <div>
                    modal
                </div>
            </ReactModal>
        </>
    )
}