import { useState, ChangeEvent, useEffect, useRef } from "react";
import {  MainPinkButton, Text } from '../../../components'
import colors from "../../../styles/colors";
import { ageWrapper, bottomButtonStyle, buttonGroupStyle, cameraIcon, contentWrapper, fileInput, formWrapper, iconWrapper, infoWrapper, nameWrapper, profileContainer, profileIcon, radioButtonStyle, sizeWrapper, validMessage, wrapper } from "./index.styles";
import { Input, SkipButton } from '../components'
import { useLocation, useNavigate } from "react-router-dom";
import { CameraIcon, Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Sdogpink, Sdogwhite } from "../../../assets/svg";
import { usePostDogsProfile } from "../../../queries/dogs";


export default function OnboardingPet(){
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState(""); 
    const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
    const [selectedDogSize, setSelectedDogSize] = useState<"SMALL" | "MEDIUM" | "LARGE" | null>(null); 
    const [isValid, setIsValid] = useState<boolean>(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [birthDay, setBirthDay] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const { mutate: registerPetProfile } = usePostDogsProfile();
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

    const handleInputNameChange = (event : ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setName(value);
    
        // 유효성 검사: 1~20자
        if (value.length >= 1 && value.length <= 20) {
            setIsNameValid(true);
        } else {
            setIsNameValid(false);
        }
    };

    //나이 유효성 검사
    const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setYear(value.slice(0, 4)); // 숫자만 허용, 4글자 제한
        }
    };

    const handleMonthChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setMonth(value.slice(0, 2)); // 숫자만 허용, 2글자 제한
        }
    };

    const handleDayChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)){ 
            setDay(value.slice(0, 2)); // 숫자만 허용, 2글자 제한
        }
    };
    //성별
    const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };
    const handleDogSizeClick = (size: "SMALL" | "MEDIUM" | "LARGE") => {
        setSelectedDogSize(size);
    };

    const handleSkipButtonClick = () =>{
        navigate('/onboarding/completion')
    }

    const handleRegisterButtonClick = () =>{
        const formData = new FormData();
        if(!isValid){
            alert("모든 정보를 정확히 입력해주세요")
            return
        }
        
        // profileSaveRequest 객체 생성
        const profileSaveRequest = {
            name,
            size: selectedDogSize,
            birthDay,
            gender,
        };

        // profileSaveRequest를 JSON으로 변환하여 FormData에 추가
        formData.append("profileSaveRequest", JSON.stringify(profileSaveRequest));

        // Only append the image file if it's new or changed
        if (profileImageSrc) {
            const fileInput = fileInputRef.current?.files?.[0];
            if (fileInput) formData.append('imageFile', fileInput);
        }
        
          
        registerPetProfile(formData, {
            onSuccess : () => {
                console.log("반려동물 등록 성공!")
                if(location.pathname === "/mypage/pet-register"){
                    navigate('/mypage')
                }else if(location.pathname === "/onboarding/pet") {
                    navigate('/onboarding/completion')
                }
            },
            onError : () => {
                alert("반려동물 등록에 실패했습니다.")
                setIsValid(false)
            },
        })
            
        
    }

    // 유효성 검사: 모든 조건 충족 시 "등록" 버튼 활성화
    useEffect(() => {
        const isBirthValid =
        year.length === 4 &&
        month.length === 2 &&
        day.length === 2 &&
        /^\d+$/.test(year) &&
        /^\d+$/.test(month) &&
        /^\d+$/.test(day);

        // 생년월일이 유효하면 저장
        if (isBirthValid) {
            const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            setBirthDay(date);
        } else {
            setBirthDay(null);
        }

        setIsValid(
            isNameValid === true &&
            selectedDogSize !== null &&
            isBirthValid &&
            gender !== null
        );
    }, [isNameValid, selectedDogSize, year, month, day, gender]);
    return(
        <div css={contentWrapper}>

            <div css={wrapper}>
                <div css={profileContainer} >
                    {/* 프로필 이미지 */}
                    {profileImageSrc ? (
                        <img src={profileImageSrc} alt="프로필" css={profileIcon} />
                    ) : (
                        <img src='/images/default_profile.png' alt="프로필" css={profileIcon} />
                    )}

                    {/* 카메라 아이콘 (파일 업로드 버튼) */}
                    <label css={cameraIcon}>
                        <CameraIcon width={24} height={24} />
                        {/* 파일 업로드 필드 */}
                        <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        css={fileInput}
                        onChange={handleImageChange}
                        />
                    </label>
                </div>
                <div css={formWrapper}>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >이름</Text>
                        </div>
                        <div>
                            <div css={nameWrapper}>
                                <Input width="100%" placeholder="반려동물의 이름을 입력해주세요" onChange={handleInputNameChange} maxLength={20}/>
                            
                            </div>
                            {isNameValid === false &&
                                <div css={validMessage}><Text type="Label3" color={colors.color.MainColor}>반려동물 이름은 1~20자 이내로 입력해주세요</Text></div>
                            }
                        </div>
                        
                    </div>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >견종크기</Text>
                        </div>
                        <div css={sizeWrapper}>
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('SMALL')}>
                                {selectedDogSize === 'SMALL' ? (
                                    <>
                                        <Sdogpink width={80}/>
                                        <Text type="Label3" color={colors.color.Black} >소형</Text>
                                    </>
                                ) : (
                                    <>
                                        <Sdogwhite width={80}/>
                                        <Text type="Label3" color={colors.color.Gray2} >소형</Text>
                                    </>
                                    
                                )}
                                
                            </div>
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('MEDIUM')}>
                                {selectedDogSize === 'MEDIUM' ? (
                                        
                                        <>
                                            <Mdogpink width={80}/>
                                            <Text type="Label3" color={colors.color.Black} >중형</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Mdogwhite width={80}/>
                                            <Text type="Label3" color={colors.color.Gray2} >중형</Text>
                                        </>
                                )}
                                
                            </div>
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('LARGE')}>
                                {selectedDogSize === 'LARGE' ? (
                                        <>
                                            <Ldogpink width={80}/>
                                            <Text type="Label3" color={colors.color.Black} >대형</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Ldogwhite width={80}/>
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
                            <Input width="60px" placeholder="YYYY" value={year} onChange={handleYearChange} />
                            <Input width="60px" placeholder="MM" value={month} onChange={handleMonthChange}/>
                            <Input width="60px" placeholder="DD" value={day} onChange={handleDayChange}/>
                        </div>
                        
                    </div>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >성별</Text>
                        </div>
                        <div css={buttonGroupStyle}>
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
                        </div>
                        
                    </div>
                </div>
            </div>
            <div css={bottomButtonStyle}>
                <MainPinkButton onClick={handleRegisterButtonClick} isDisabled={!isValid}>등록</MainPinkButton>
                {location.pathname !== "/mypage/pet-register" &&
                    <SkipButton title="건너뛰기" onClick={handleSkipButtonClick}/>
                }
            </div>
        </div>
    )
}
