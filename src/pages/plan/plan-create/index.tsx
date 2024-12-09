/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  PageWrapperStyle,
  FixedHeaderStyle,
  InputWrapperStyle,
  InputFieldStyle,
  CityListWrapperStyle,
  CityItemStyle,
  CityInfoWrapperStyle,
  CityImageStyle,
  FooterStyle,
  SelectButtonStyle,
} from "../index.styles";
import { Button } from "../../../components/button/button";
import { typo } from "../../../styles/typo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { datepickerCustomStyles } from "../index.styles";
export default function PlanCreate() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const cities = [
    { id: 1, name: "가평·양평", description: "가평, 양평" },
    { id: 2, name: "강릉·속초", description: "강릉, 속초, 양양" },
    { id: 3, name: "경주", description: "경주" },
    { id: 4, name: "부산", description: "부산" },
    { id: 5, name: "여수", description: "여수, 순천" },
    { id: 6, name: "인천", description: "인천, 강화도" },
    { id: 7, name: "전주", description: "전주, 군산" },
    { id: 8, name: "제주", description: "제주, 서귀포" },
    { id: 9, name: "춘천·홍천", description: "춘천, 홍천" },
  ];

  const handleCityClick = (id: string) => {
    setSelectedCity(id === selectedCity ? null : id);
  };

  return (
    <>
      <div css={FixedHeaderStyle}>
        <span css={typo.Heading2}>여행</span>
        <h1 css={typo.Heading1} style={{ marginTop: "10px" }}>
          언제 떠나시나요?
        </h1>
        <div css={[InputWrapperStyle, datepickerCustomStyles]}>
          <span>📅</span>
          <DatePicker
            selected={selectedDate} // 선택된 날짜
            onChange={(date: Date) => setSelectedDate(date)} // 날짜 변경 핸들러
            placeholderText="여행 날짜를 선택해주세요." // 입력 필드에 표시되는 기본 텍스트
            dateFormat="yyyy-MM-dd" // 날짜 형식 지정
            css={InputFieldStyle} // 스타일 적용
          />
        </div>
      </div>
      <div css={PageWrapperStyle}>
        <div css={CityListWrapperStyle}>
          {cities.map((city) => (
            <div key={city.id} css={CityItemStyle}>
              <div css={CityInfoWrapperStyle}>
                <img
                  src={`https://via.placeholder.com/50?text=${city.name}`}
                  alt={city.name}
                  css={CityImageStyle}
                />
                <div>
                  <p>{city.name}</p>
                  <p>{city.description}</p>
                </div>
              </div>
              <button
                css={SelectButtonStyle(selectedCity === city.id)}
                onClick={() => handleCityClick(city.id)}
              >
                {selectedCity === city.id ? "취소" : "선택"}
              </button>
            </div>
          ))}
        </div>

        <footer css={FooterStyle}>
          <button
            css={Button.mainPinkButton({
              isDisabled: false,
              width: "80%",
            })}
          >
            선택완료
          </button>
        </footer>
      </div>
    </>
  );
}
