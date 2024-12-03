import ReactModal from "react-modal";
import modalStyles, { ageWrapper, buttonGroupStyle, buttonStyle, cameraIcon, closeIcon, fileInput, formWrapper, genderStyle, iconWrapper, imageStyle, infoWrapper, radioButtonStyle, sizeWrapper, wrapper } from "./index.styles";
import colors from "../../../../styles/colors";
import { GrayBorderButton, MainPinkButton, Text } from "../../../../components";
import { CameraIcon, CloseIcon, Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Sdogpink, Sdogwhite } from "../../../../assets/svg";
import { useGetDogsProfileDogId, usePutDogsProfileDogId,  } from "../../../../queries";
import { translateGender } from "../../../../utils/translations";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import DeleteModal from "../delete-modal";
import { Input } from "../../../onboarding/components";

interface Props{
    isOpen : boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // 모달 상태 변경 함수
    dogId : number;

}
export default function PetInfoModal({isOpen, setIsOpen, dogId}: Props){
    const {data : dogInfo} = useGetDogsProfileDogId(dogId)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const [gender, setGender] = useState<string|null>(dogInfo?.gender)
    const [selectedDogSize, setSelectedDogSize] = useState<"SMALL" | "MEDIUM" | "LARGE" | null>(dogInfo?.size); 
    const [profileImageSrc, setProfileImageSrc] = useState<string | null>(dogInfo?.imageUrl || "/images/default_profile.png");
    const date = dogInfo?.birthDay
    const [newYear, setNewYear] = useState("")
    const [newMonth, setNewMonth] = useState("")
    const [newDay, setNewDay] = useState("")
    const [birthDay, setBirthDay] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    
    const {mutate : modifyPetProfile} = usePutDogsProfileDogId(dogId)

    const handleDeleteButtonClick = () =>{ // 삭제 버튼 클릭 시 확인 모달
        setIsDeleteModalOpen(true)
    }

    const handleModifyButtonClick = () => { //수정 버튼 
        setIsEditMode(true)
        const [year, month, day] = date.split("-")
        setNewYear(year)
        setNewMonth(month)
        setNewDay(day)
        setSelectedDogSize(dogInfo?.size)
        setGender(dogInfo?.gender)
        setProfileImageSrc(dogInfo?.imageUrl || "/images/default_profile.png")
    }

    const closeModal = () => { // 전체 모달 닫힘
        setIsOpen(false)
        setIsDeleteModalOpen(false)
    }

    // 이미지 변경 핸들러
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (reader.result) setProfileImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    //견종 크기
    const handleSizeClick = (size:"SMALL" | "MEDIUM" | "LARGE" ) => {
        if (isEditMode) {
            setSelectedDogSize(size);
        }
    };

    //나이 유효성 검사
    const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setNewYear(value.slice(0, 4)); // 숫자만 허용, 4글자 제한
        }
    };

    const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setNewMonth(value.slice(0, 2)); // 숫자만 허용, 2글자 제한
        }
    };

    const handleDayChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setNewDay(value.slice(0, 2)); // 숫자만 허용, 2글자 제한
        }
    };

    //성별
    const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    const handleSaveButtonClick = () =>{ //수정 시 저장 버튼 
        
        const formData = new FormData();
        
        // profileSaveRequest 객체 생성
        const profileSaveRequest = {
            name : dogInfo?.name,
            size: selectedDogSize,
            birthDay,
            gender,
        };

        // profileSaveRequest를 JSON으로 변환하여 FormData에 추가
        formData.append("profileSaveRequest", JSON.stringify(profileSaveRequest));

        if (profileImageSrc) {
            const fileInput = fileInputRef.current?.files?.[0];
            if (fileInput) {
                // 새로운 파일이 선택된 경우
                formData.append('imageFile', fileInput);
            } 
        }
       
        
        modifyPetProfile(formData, {
            onSuccess : () => {
                console.log("반려동물 수정 성공!")
                setIsEditMode(false)
                closeModal()
            },
            onError : () => {
                alert("반려동물 수정 실패.")
                setIsEditMode(false)
            },
        })

    }

    // 유효성 검사
    useEffect(() => {
        const isBirthValid =
        newYear.length === 4 &&
        newMonth.length === 2 &&
        newDay.length === 2 &&
        /^\d+$/.test(newYear) &&
        /^\d+$/.test(newMonth) &&
        /^\d+$/.test(newDay);

        // 생년월일이 유효하면 저장
        if (isBirthValid) {
            const date = `${newYear}-${newMonth.padStart(2, "0")}-${newDay.padStart(2, "0")}`;
            setBirthDay(date);
        } else {
            setBirthDay(null);
        }

    }, [newYear, newMonth, newDay]);

    return (
        <>
            <ReactModal 
              isOpen={isOpen} 
              style={modalStyles} 
              appElement={document.getElementById("root")} 
              onRequestClose={closeModal}
              shouldCloseOnOverlayClick={true} // 영역 밖 클릭 시 닫기
            >
              <div css={wrapper}>
                  <div css={closeIcon}>
                    <CloseIcon width={12} onClick={closeModal}/>
                  </div>
                  <Text type="Heading3">{dogInfo?.name}</Text>
                  <div css={imageStyle}>
                    {isEditMode ? (
                        <>
                            <img src={profileImageSrc} css={imageStyle} alt="profile"/> 
                            {/* 카메라 아이콘 (파일 업로드 버튼) */}
                            <label css={cameraIcon}>
                                <CameraIcon width={24} height={24} />
                                {/* 파일 업로드 필드 */}
                                <input
                                type="file"
                                accept="image/*"
                                css={fileInput}
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                />
                            </label> 
                        </>
                    ) : (
                        <img src={dogInfo?.imageUrl || "/images/default_profile.png"} css={imageStyle} alt="profile"/>  
                    )}
                  </div>
                  <div css={formWrapper}>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >견종크기</Text>
                        </div>
                        {isEditMode ? (
                            <div css={sizeWrapper}>
                                {/* 소형 */}
                                <div css={iconWrapper(isEditMode)} onClick={()=> handleSizeClick("SMALL")}>
                                    {selectedDogSize === "SMALL" ? <Sdogpink width={60} /> : <Sdogwhite width={60} />}
                                    <Text type="Label3" color={selectedDogSize === "SMALL" ? colors.color.Black : colors.color.Gray2}>
                                    소형
                                    </Text>
                                </div>
                                {/* 중형 */}
                                <div css={iconWrapper(isEditMode)} onClick={()=> handleSizeClick("MEDIUM")}>
                                    {selectedDogSize === "MEDIUM" ? <Mdogpink width={60} /> : <Mdogwhite width={60} />}
                                    <Text type="Label3" color={selectedDogSize === "MEDIUM" ? colors.color.Black : colors.color.Gray2}>
                                    중형
                                    </Text>
                                </div>
                                {/* 대형 */}
                                <div css={iconWrapper(isEditMode)} onClick={()=> handleSizeClick("LARGE")}>
                                    {selectedDogSize === "LARGE" ? <Ldogpink width={60} /> : <Ldogwhite width={60} />}
                                    <Text type="Label3" color={selectedDogSize === "LARGE" ? colors.color.Black : colors.color.Gray2}>
                                    대형
                                    </Text>
                                </div>

                            </div>
                        ) : (
                            <div css={sizeWrapper}>
                                {/* 소형 */}
                                <div css={iconWrapper(isEditMode)}>
                                    {dogInfo?.size === "SMALL" ? <Sdogpink width={60} /> : <Sdogwhite width={60} />}
                                    <Text type="Label3" color={dogInfo?.size === "SMALL" ? colors.color.Black : colors.color.Gray2}>
                                    소형
                                    </Text>
                                </div>
                                {/* 중형 */}
                                <div css={iconWrapper(isEditMode)}>
                                    {dogInfo?.size === "MEDIUM" ? <Mdogpink width={60} /> : <Mdogwhite width={60} />}
                                    <Text type="Label3" color={dogInfo?.size === "MEDIUM" ? colors.color.Black : colors.color.Gray2}>
                                    중형
                                    </Text>
                                </div>
                                {/* 대형 */}
                                <div css={iconWrapper(isEditMode)}>
                                    {dogInfo?.size === "LARGE" ? <Ldogpink width={60} /> : <Ldogwhite width={60} />}
                                    <Text type="Label3" color={dogInfo?.size === "LARGE" ? colors.color.Black : colors.color.Gray2}>
                                    대형
                                    </Text>
                                </div>
    
                            </div>

                        )
                        }
                        
                    </div>
                    <div css={infoWrapper} >
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >생일</Text>
                        </div>
                        <div css={ageWrapper}>
                            {isEditMode ? (
                                <>
                                    <Input width="60px" placeholder="YYYY" value={newYear} onChange={handleYearChange}/>
                                    <Input width="60px" placeholder="MM" value={newMonth} onChange={handleMonthChange}/>
                                    <Input width="60px" placeholder="DD" value={newDay} onChange={handleDayChange}/>
                                </>
                            ) : (
                                <Text type="Label2">
                                  {dogInfo?.birthDay} {`(만 ${dogInfo?.age}세)`}
                                </Text>

                            )}
                        </div>
                        
                    </div>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >성별</Text>
                        </div>
                        <div css={buttonGroupStyle}>
                            {isEditMode ? (
                                <>
                                    <label css={radioButtonStyle(gender === "MALE")}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="MALE"
                                            checked={gender === "MALE"}
                                            onChange={handleGenderChange}
                                        />
                                        <Text type="Label2">남아</Text>
                                    </label>
                                    <label css={radioButtonStyle(gender === "FEMALE")}>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="FEMALE"
                                            checked={gender === "FEMALE"}
                                            onChange={handleGenderChange}
                                        />
                                        <Text type="Label2">여아</Text>
                                    </label>
                                </>
                            ) : (
                                <label css={genderStyle}>
                                      <Text type="Label3">{translateGender(dogInfo?.gender)}</Text>
                                </label>

                            )}
                        </div>
                    </div>
                </div>
                <div css={buttonStyle}>
                    {isEditMode ? (
                        <>
                            <MainPinkButton width="100%" height="40px" title="저장" onClick={handleSaveButtonClick}/>
                        </>
                    ) : (
                        <>
                            <GrayBorderButton width="40%" height="40px" title="삭제" onClick={handleDeleteButtonClick}/>
                            <MainPinkButton width="60%" height="40px" title="수정" onClick={handleModifyButtonClick}/>
                        </>
                    )}
                </div>
              </div>
              {isDeleteModalOpen && (
                <DeleteModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} dogId={dogId} onClose={closeModal}/>
              )}
            </ReactModal>
        </>
    )
}