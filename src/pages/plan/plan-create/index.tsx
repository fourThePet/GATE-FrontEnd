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
import { useNavigate } from "react-router-dom";
import { useGetPlacesCities } from "../../../queries";

export default function PlanCreate() {
  const [selectedCity, setSelectedCity] = useState<number | null>(null); // Change to number | null
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleCityClick = (id: number) => {
    // Ensure id is of type number
    setSelectedCity(id === selectedCity ? null : id);
  };

  const handlePetChoiceButtonClick = () => {
    navigate(`/plan/create/pet-choice`);
  };

  const { data: cities, isLoading, isError } = useGetPlacesCities();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>지역 정보를 가져오는 데 실패했습니다.</p>;

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
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            placeholderText="여행 날짜를 선택해주세요."
            dateFormat="yyyy-MM-dd"
            css={InputFieldStyle}
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
                  alt={city.cityName}
                  css={CityImageStyle}
                />
                <div>
                  <p>{city.cityName}</p>
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
            onClick={handlePetChoiceButtonClick}
          >
            선택완료
          </button>
        </footer>
      </div>
    </>
  );
}
