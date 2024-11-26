import { useState, ChangeEvent, useEffect } from "react";

import {MainPinkButton,Text } from '../../../components';
import colors from "../../../styles/colors";
import { Input } from "../components";
import { ageWrapper, bottomButtonStyle, buttonGroupStyle, contentWrapper, formWrapper, infoWrapper, nicknameWrapper, radioButtonStyle, textWrapper, validMessage, wrapper } from "./index.styles";
import { useNavigate } from "react-router-dom";
import { UserInfoForm } from "../../../interfaces/user";

export default function OnboardingUser(){
    const navigate = useNavigate();
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null); //닉네임 유효성 상태
    const [isNicknameCheck, setIsNicknameCheck] = useState<boolean | null>(false);
    const [isValid, setIsValid] =  useState<boolean>(false); //다음 버튼 유효성 검사 (모든 조건을 통과해야지 넘어감)
    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    const [formData, setFormData] = useState<UserInfoForm>({
        nickname : nickname,
        age : '',
        gender : ''
    });
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

    const handleSaveDate = () => {
        if (year.length === 4 && month.length === 2 && day.length === 2) {
            const date = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
            setFormattedDate(date);
            console.log("Saved Date:", date);
        } else {
            alert("올바른 날짜를 입력해주세요.");
        }
    };

    //성별
    const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };

    //닉네임
    const handleInputNicknameChange = (event : ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNickname(value);
    
        // 유효성 검사: 2~20자
        if (value.length >= 2 && value.length <= 20) {
            setIsNicknameValid(true);
        } else {
            setIsNicknameValid(false);
            setIsNicknameCheck(false);
        }
    };

    //중복체크 검사
    const handleNicknameCheckButtonClick = () =>{//중복체크 
        
        if(isNicknameValid){ //닉네임 유효성 검사 + 중복체크 API 
            setIsNicknameCheck(true)
        }else {
            setIsNicknameCheck(false)
        }
    }

    // 다음 버튼 클릭 핸들러
    const handleNextButtonClick = () => {
        if (isValid && formattedDate) {
            console.log("Saved Data:", formattedDate, nickname, selectedGender);
            navigate('/onboarding/pet');
        } else {
            alert("모든 정보를 정확히 입력해주세요.");
        }
    };


    // 모든 입력 조건을 충족하는지 확인
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
            isNicknameCheck === true && isNicknameValid === true && isBirthValid && selectedGender !== null
        );
    }, [isNicknameCheck, isNicknameValid, year, month, day, selectedGender]);

    return (
        <div css={contentWrapper}>

            <div css={wrapper}>
                <div css={textWrapper}>
                    <Text type="Heading3" color={colors.color.Black} >
                        <Text type="Heading3" color={colors.color.MainColor} >{'이민주'}</Text>
                        님 반가워요!
                    </Text>
                </div>
                <div css={formWrapper}>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >닉네임</Text>
                        </div>
                        <div>
                            <div css={nicknameWrapper}>
                                <Input width="400px" placeholder="닉네임을 입력해주세요" onChange={handleInputNicknameChange} maxLength={20}/>
                                <MainPinkButton onClick={handleNicknameCheckButtonClick} isDisabled={!isNicknameCheck}  width="80px" height="48px" title="중복체크"/>
                            </div>
                            {isNicknameValid === false &&
                                <div css={validMessage}><Text type="Label3" color={colors.color.MainColor}>닉네임은 2~20자 이내로 입력해주세요</Text></div>
                            }
                        </div>
                        
                    </div>
                    <div css={infoWrapper} >
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >생년월일</Text>
                        </div>
                        <div css={ageWrapper}>
                            <Input width="60px" placeholder="YYYY" value={year} onChange={handleYearChange}/>
                            <Input width="60px" placeholder="MM" value={month} onChange={handleMonthChange}/>
                            <Input width="60px" placeholder="DD" value={day} onChange={handleDayChange}/>
                        </div>
                        
                    </div>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >성별</Text>
                        </div>
                        <div css={buttonGroupStyle}>
                            <label css={radioButtonStyle(selectedGender === "남자")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남자"
                                    checked={selectedGender === "남자"}
                                    onChange={handleGenderChange}
                                />
                                <Text type="Label2">남자</Text>
                            </label>
                            <label css={radioButtonStyle(selectedGender === "여자")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여자"
                                    checked={selectedGender === "여자"}
                                    onChange={handleGenderChange}
                                />
                                <Text type="Label2">여자</Text>
                            </label>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div css={bottomButtonStyle}>
                <MainPinkButton onClick={handleNextButtonClick} isDisabled={!isValid} title="다음"/>
            </div>
        </div>
    )
}