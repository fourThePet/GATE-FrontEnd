import { useState, ChangeEvent, useEffect } from "react";

import {MainPinkButton,Text } from '../../../components';
import colors from "../../../styles/colors";
import { Input } from "../components";
import { ageWrapper, bottomButtonStyle, buttonGroupStyle, contentWrapper, formWrapper, infoWrapper, nicknameWrapper, radioButtonStyle, textWrapper, validMessage, wrapper } from "./index.styles";
import { useNavigate } from "react-router-dom";
import { UserInfoForm } from "../../../interfaces";
import { usePostMembersCheckNickname, usePostMembersSignup } from "../../../queries/members";
import { HeaderLogo } from "../../../assets/svg";

export default function OnboardingUser(){
    const navigate = useNavigate();
    const [nickName, setNickName] = useState(""); // 닉네임 상태
    const [isNicknameValid, setIsNicknameValid] = useState<boolean | null>(null); //닉네임 유효성 상태
    const [isNicknameCheck, setIsNicknameCheck] = useState<boolean | null>(false);
    const [isValid, setIsValid] =  useState<boolean>(false); //다음 버튼 유효성 검사 (모든 조건을 통과해야지 넘어감)
    const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [birthday, setBirthday] = useState<string | null>(null);


    const { mutate: checkNickname } = usePostMembersCheckNickname();
    const { mutate: postSignup } = usePostMembersSignup();
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
        if(event.target.value == "MALE"){
            setGender("MALE")
        }else if(event.target.value == "FEMALE"){
            setGender("FEMALE")
        }
        
    };

    //닉네임
    const handleInputNicknameChange = (event : ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNickName(value);
    
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
            checkNickname(
                { nickName }, // API에 보낼 데이터
                {
                    onSuccess: () => {
                        setIsNicknameCheck(true);
                    },
                    onError: () => {
                        alert("이미 중복된 아이디 입니다.")
                        setIsNicknameCheck(false); // 오류 시 중복된 것으로 처리
                    },
                }
            );
        }
    }

    // 다음 버튼 클릭 핸들러
    const handleNextButtonClick = () => {
        if (isValid && birthday) {
            const formData: UserInfoForm = {
                nickName,
                birthday,
                gender,
            };
            console.log(formData)
            postSignup(formData, {
                onSuccess: () => {
                    console.log("회원가입 성공!");
                    navigate('/onboarding/pet');
                },
                onError: (error) => {
                    console.error("회원가입 실패:", error);
                    alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
                },
            });
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
            setBirthday(date);
        } else {
            setBirthday(null);
        }

        setIsValid(
            isNicknameCheck === true && isNicknameValid === true && isBirthValid && gender !== null
        );
    }, [isNicknameCheck, isNicknameValid, year, month, day, gender]);

    return (
        <div css={contentWrapper}>

            <div css={wrapper}>
                <div css={textWrapper}>
                    <HeaderLogo width={200}/>
                </div>
                <div css={formWrapper}>
                    <div css={infoWrapper}>
                        <div>
                            <Text type="Body3" color={colors.color.MainColor} >닉네임</Text>
                        </div>
                        <div>
                            <div css={nicknameWrapper}>
                                <Input width="400px" placeholder="닉네임을 입력해주세요" onChange={handleInputNicknameChange} maxLength={20}/>
                                <MainPinkButton onClick={handleNicknameCheckButtonClick} isDisabled={!isNicknameCheck}  width="100px" height="48px" title="중복체크"/>
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
                            <label css={radioButtonStyle(gender === "MALE")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="MALE"
                                    checked={gender === "MALE"}
                                    onChange={handleGenderChange}
                                />
                                <Text type="Label2">남자</Text>
                            </label>
                            <label css={radioButtonStyle(gender === "FEMALE")}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="FEMALE"
                                    checked={gender === "FEMALE"}
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