/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { typo } from "../../../../styles/typo";

export const TravelForm = ({
  imageUrl,
  travelName,
  date,
  dogCount,
}: {
  imageUrl: string;
  travelName: string;
  date: string;
  dogCount: number;
}) => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        padding: 10px 0;
      `}
    >
      <img
        src={imageUrl}
        alt={travelName}
        css={css`
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        `}
      />
      <div>
        <div
          css={css`
            ${typo.Body1};
            font-weight: bold;
            margin-bottom: 5px;
          `}
        >
          {travelName}
        </div>
        <div
          css={css`
            ${typo.Body2};
            color: #888;
          `}
        >
          {date}
        </div>
        <div
          css={css`
            ${typo.Body3};
            color: #aaa;
          `}
        >
          {dogCount}개 도시
        </div>
      </div>
    </div>
  );
};
