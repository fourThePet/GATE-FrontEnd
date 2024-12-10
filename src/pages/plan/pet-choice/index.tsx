import { useGetDogsProfiles } from "../../../queries/dogs";
import { FooterStyle, PageWrapperStyle } from "../../plan/index.styles";
import { Button } from "../../../components/button/button";
import { css } from "@emotion/react";
import { useState } from "react";
import { typo } from "../../../styles/typo";
import { Petchoice, DefaultProfile } from "../../../assets/svg";
import { useNavigate } from "react-router-dom";

export default function PetChoice() {
  const navigate = useNavigate();
  const { data: dogsProfiles, isLoading, isError } = useGetDogsProfiles();
  const [selectedPets, setSelectedPets] = useState<number[]>([]);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>반려견 정보를 가져오는 데 실패했습니다.</p>;

  const handleSelectPet = (id: number) => {
    setSelectedPets((prev) =>
      prev.includes(id) ? prev.filter((petId) => petId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Page Wrapper */}
      <div css={PageWrapperStyle}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 100px;
          `}
        >
          <div
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            <Petchoice width={120} height={120} />
            <br />
            <span css={typo.Heading1}>누구와 떠나나요?</span>
            <p css={typo.Body1} style={{ color: "#9A9EA6" }}>
              내 강아지와 함께 떠나요!
            </p>
          </div>

          {dogsProfiles && dogsProfiles.length > 0 ? (
            <div
              css={css`
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                justify-content: center;
                margin-bottom: 80px;
              `}
            >
              {dogsProfiles.map(
                (dog: { id: number; name: string; imageUrl?: string }) => (
                  <div
                    key={dog.id}
                    onClick={() => handleSelectPet(dog.id)}
                    css={css`
                      position: relative; /* To position the checkmark overlay */
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      cursor: pointer;

                      border-radius: 50%;
                      padding: 5px;
                      transition: border 0.2s ease;
                    `}
                  >
                    {dog.imageUrl ? (
                      <img
                        src={dog.imageUrl}
                        alt={dog.name}
                        css={css`
                          width: 120px;
                          height: 120px;
                          object-fit: cover;
                          border-radius: 50%;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        `}
                      />
                    ) : (
                      <DefaultProfile
                        width={"120px"}
                        height={"120px"}
                        css={css`
                          border-radius: 50%;
                          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        `}
                      />
                    )}

                    {/* Checkmark Overlay */}
                    {selectedPets.includes(dog.id) && (
                      <div
                        css={css`
                          position: absolute;
                          top: 41.5%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          background-color: rgba(255, 255, 255, 0.8);
                          width: 120px;
                          height: 120px;
                          border-radius: 50%;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#f1729b"
                          width="48px"
                          height="48px"
                        >
                          <path d="M9 16.2l-3.5-3.5L4.4 14.8 9 19.4 20.3 8l-1.3-1.4z" />
                        </svg>
                      </div>
                    )}

                    <span
                      css={css`
                        margin-top: 10px;
                        font-size: 14px;
                        font-weight: bold;
                        color: ${selectedPets.includes(dog.id)
                          ? "#f1729b"
                          : "black"};
                      `}
                    >
                      {dog.name}
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              css={css`
                text-align: center;
                margin-top: 50px;
              `}
            >
              <p
                css={typo.Body1}
                style={{ color: "#9A9EA6", marginBottom: "20px" }}
              >
                등록된 반려견이 없습니다.
              </p>
              <button
                css={Button.mainPinkButton({
                  isDisabled: false,
                  width: "200px",
                })}
                onClick={handleRegisterPet}
              >
                반려견 등록
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer css={FooterStyle}>
        <button
          css={[
            Button.mainPinkButton({
              isDisabled: selectedPets.length === 0,
              width: "90%",
            }),
            css`
              transition: background-color 0.3s ease;
            `,
          ]}
          onClick={() => {
            handleNextClick();
          }}
          disabled={selectedPets.length === 0}
        >
          다음
        </button>
      </footer>
    </>
  );
}
