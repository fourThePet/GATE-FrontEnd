import { forwardRef, Ref, useState } from "react";
import {
  InputWrapperStyle,
  InputFieldStyle,
  CityInfoWrapperStyle,
  CityImageStyle,
  FooterStyle,
  SelectButtonStyle,
} from "../index.styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { datepickerCustomStyles } from "../index.styles";
import { useNavigate } from "react-router-dom";
import { useGetPlacesCities } from "../../../queries";
import { LoadingBar, MainPinkButton, Text } from "../../../components";
import { cityItemStyle, cityListWrapperStyle, fixedHeaderStyle, pageWrapperStyle, titleWrapper } from "./index.styles";
import { formatDate } from "../../../utils/dateFomatter";
import usePlanStore from "../../../stores/usePlanStore";
import { notify } from "../../../utils/constants";




export default function PlanCreate() {
  const { date, cityId, setCityName, setDate, setCityId } = usePlanStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isDisabled = !(cityId && date);
  const navigate = useNavigate();

  const CustomInput = forwardRef((props, ref:Ref<HTMLInputElement>) => ( //DatePicker 문자열 방지
    <input
      {...props}
      ref={ref}
      readOnly // 문자열 입력 방지
      style={{ cursor: "pointer" }} // 클릭 가능한 스타일 추가
    />
  ));

  const handleCityClick = (id: number, name:string) => {
    setCityName(name)
    setCityId(id)
  };

  const handleChangeDate = (date: Date) => {
    setSelectedDate(date); // Date 객체를 상태에 저장
    if (date) {
      setDate(formatDate(date)); // 포맷된 문자열 상태에 저장
    } else {
      setDate(null);
    }
  }

  const handlePetChoiceButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(isDisabled){
      e.preventDefault()
      notify({
        type: "warning",
        text: "날짜와 장소를 선택해주세요"
      })
      return;
    }
    console.log(cityId, date)
    navigate(`/plan/create/pet-choice`);
  };

  
  const { data: cities, isLoading, isError } = useGetPlacesCities();

  if (isLoading) return  (<LoadingBar/>);
  if (isError) return <p>지역 정보를 가져오는 데 실패했습니다.</p>;

  
  
  return (
    <>
      <div css={fixedHeaderStyle}>
        <div css={titleWrapper}>
          <Text type="Heading3">여행</Text>
          <Text type="Heading2">언제 떠나시나요?</Text>
        </div>
        <div css={[InputWrapperStyle, datepickerCustomStyles]}>
          <span>📅</span>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            placeholderText="여행 날짜를 선택해주세요."
            dateFormat="yyyy-MM-dd"
            css={InputFieldStyle}
            minDate={new Date()} //오늘날짜 이전은 선택 못함
            customInput={<CustomInput />} // 사용자 정의 입력 필드
          />
        </div>
      </div>
      <div css={pageWrapperStyle}>
        <div css={cityListWrapperStyle}>
          {cities.map((city) => (
            <div key={city.id} css={cityItemStyle}>
              <div css={CityInfoWrapperStyle}>
                <img
                  src={city.photoUrl}
                  alt={city.cityName}
                  css={CityImageStyle}
                />
                <div>
                  <Text type="Body2">{city.cityName}</Text>
                </div>
              </div>
              <button
                css={SelectButtonStyle(cityId === city.id)}
                onClick={() => handleCityClick(city.id, city.cityName)}
              >
                {cityId === city.id ? "취소" : "선택"}
              </button>
            </div>
          ))}
        </div>

        <footer css={FooterStyle}>
          <MainPinkButton onClick={handlePetChoiceButtonClick} isDisabled={isDisabled}>선택완료</MainPinkButton>
        </footer>
      </div>
    </>
  );
}
