/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { typo } from "../../../../styles/typo";

interface TravelFormProps {
  imageUrl: string;
  travelName: string;
  date: string;
  dogCount: number;
}

export const TravelForm = ({
  imageUrl,
  travelName,
  date,
  dogCount,
}: TravelFormProps) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      `}
    >
      {/* 이미지 */}
      <img
        src={imageUrl}
        alt={travelName}
        css={css`
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        `}
      />
      {/* 여행 정보 */}
      <div>
        <h4
          css={css`
            ${typo.Heading3};
            margin: 0;
          `}
        >
          {travelName}
        </h4>
        <p
          css={css`
            ${typo.Body2};
            margin: 5px 0 0;
            color: #888;
          `}
        >
          {date}
        </p>
        <p
          css={css`
            ${typo.Body2};
            margin: 0;
            color: #888;
          `}
        >
          {dogCount}마리의 강아지와 함께
        </p>
      </div>
    </div>
  );
};
