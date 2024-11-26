import { useState, ChangeEvent, useEffect } from "react";
import {  MainPinkButton, Text } from '../../../components'
import colors from "../../../styles/colors";
import { ageWrapper, bottomButtonStyle, buttonGroupStyle, cameraIcon, contentWrapper, fileInput, formWrapper, iconWrapper, infoWrapper, nameWrapper, profileContainer, profileIcon, radioButtonStyle, sizeWrapper, validMessage, wrapper } from "./index.styles";
import { Input, SkipButton } from '../components'
import { useNavigate } from "react-router-dom";
import { CameraIcon, Ldogpink, Ldogwhite, Mdogpink, Mdogwhite, Sdogpink, Sdogwhite } from "../../../assets/svg";


export default function OnboardingPet(){
    const navigate = useNavigate();
    const [name, setName] = useState(""); 
    const [isNameValid, setIsNameValid] = useState<boolean | null>(null);
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
    const [selectedDogSize, setSelectedDogSize] = useState<"small" | "medium" | "large" | null>(null); 
    const [isValid, setIsValid] = useState<boolean>(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    // 이미지 변경 핸들러
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const imageUrl = URL.createObjectURL(file);
        setProfileImageSrc(imageUrl); // 이미지 상태 업데이트
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
        setSelectedGender(event.target.value);
    };
    const handleDogSizeClick = (size: "small" | "medium" | "large") => {
        setSelectedDogSize(size);
    };

    const handleSkipButtonClick = () =>{
        navigate('/')
    }

    const handleRegisterButtonClick = () =>{
        if(isValid){
            console.log(formattedDate, name, selectedDogSize, selectedGender)
            navigate('/onboarding/completion')
        }else {
            alert("모든 정보를 정확히 입력해주세요.");
        }
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
            setFormattedDate(date);
        } else {
            setFormattedDate(null);
        }

        setIsValid(
        isNameValid === true &&
            selectedDogSize !== null &&
            isBirthValid &&
            selectedGender !== null
        );
    }, [isNameValid, selectedDogSize, year, month, day, selectedGender]);
    return(
        <div css={contentWrapper}>

            <div css={wrapper}>
                <div css={profileContainer}>
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
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('small')}>
                                {selectedDogSize === 'small' ? (
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
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('medium')}>
                                {selectedDogSize === 'medium' ? (
                                        
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
                            <div css={iconWrapper} onClick={() => handleDogSizeClick('large')}>
                                {selectedDogSize === 'large' ? (
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
                            <Text type="Body3" color={colors.color.MainColor} >생년월일</Text>
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
                            <label css={radioButtonStyle(selectedGender === "남아")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남아"
                                    checked={selectedGender === "남아"}
                                    onChange={handleGenderChange}
                                />
                                <Text type="Label2">남아</Text>
                            </label>
                            <label css={radioButtonStyle(selectedGender === "여아")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여아"
                                    checked={selectedGender === "여아"}
                                    onChange={handleGenderChange}
                                />
                                <Text type="Label2">여아</Text>
                            </label>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div css={bottomButtonStyle}>
                <MainPinkButton  title="등록" onClick={handleRegisterButtonClick} isDisabled={!isValid}/>
                <SkipButton title="건너뛰기" onClick={handleSkipButtonClick}/>
            </div>
        </div>
    )
}
