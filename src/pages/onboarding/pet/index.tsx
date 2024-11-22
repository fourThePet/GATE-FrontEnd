import { useState, ChangeEvent } from "react";
import {  MainPinkButton, Text, WhiteBorderButton } from "../../../components";
import colors from "../../../styles/colors";
import Input from "../components/input";
import { ageWrapper, bottomButtonStyle, buttonGroupStyle, formWrapper, iconWrapper, infoWrapper, nameWrapper, radioButtonStyle, sizeWrapper, wrapper } from "./index.styles";
import {  Ldogwhite, Mdogwhite, Sdogwhite } from "../../../assets/svg";

export default function OnboardingPet(){
    const [selectedGender, setSelectedGender] = useState<string | null>(null);
    //성별
    const handleGenderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(event.target.value);
    };
    return(
        <div css={wrapper}>
            <div>
                <DefaultProfile width={100}/>
                <CameraIcon width={24}/>
            </div>
            <div css={formWrapper}>
                <div css={infoWrapper}>
                    <div>
                        <Text type="Body3" color={colors.color.MainColor} >이름</Text>
                    </div>
                    <div>
                        <div css={nameWrapper}>
                            <Input width="100%" placeholder="반려동물의 이름을 입력해주세요" />
                           
                        </div>
                        {/* {isNicknameValid === false &&
                            <div css={validMessage}><Text type="Label3" color={colors.color.MainColor}>닉네임은 2~20자 이내로 입력해주세요</Text></div>
                        } */}
                    </div>
                    
                </div>
                <div css={infoWrapper}>
                    <div>
                        <Text type="Body3" color={colors.color.MainColor} >견종크기</Text>
                    </div>
                    <div css={sizeWrapper}>
                        <div css={iconWrapper}>
                            <Sdogwhite width={80}/>
                            <Text type="Label3" color={colors.color.Gray2} >소형</Text>
                        </div>
                        <div css={iconWrapper}>
                            <Mdogwhite width={80}/>
                            <Text type="Label3" color={colors.color.Gray2} >중형</Text>
                        </div>
                        <div css={iconWrapper}>
                            <Ldogwhite width={80}/>
                            <Text type="Label3" color={colors.color.Gray2} >대형</Text>
                        </div>

                    </div>
                    
                </div>
                <div css={infoWrapper} >
                    <div>
                        <Text type="Body3" color={colors.color.MainColor} >생년월일</Text>
                    </div>
                    <div css={ageWrapper}>
                        <Input width="60px" placeholder="YYYY" />
                        <Input width="60px" placeholder="MM"/>
                        <Input width="60px" placeholder="DD"/>
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
                                value="여자"
                                checked={selectedGender === "여아"}
                                onChange={handleGenderChange}
                            />
                            <Text type="Label2">여아</Text>
                        </label>
                    </div>
                    
                </div>
            </div>
            <div css={bottomButtonStyle}>
                <MainPinkButton  title="등록"/>
                <WhiteBorderButton title="건너뛰기"/>
            </div>
        </div>
    )
}