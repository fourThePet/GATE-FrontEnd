import { GrayDeleteIcon, PlanChange } from "../../../../assets/svg";
import { Text } from "../../../../components";
import colors from "../../../../styles/colors";
import SequenceLabel from "../sequence-label";
import { detailInfoWrapper, listCardWrapper, titleWrapper, wrapper } from "./index.styles";
import { Draggable } from "react-beautiful-dnd";

interface Props {
    sequence: number;
    index: number;
    place : {
        name: string;
        category : string
    };
    onDelete : () => void
}

export default function PlanEditCard({ sequence, place,index, onDelete }: Props) {
    return (
        <Draggable draggableId={String(sequence)} index={index}>
            {(provided) => (
                <div
                    css={wrapper}
                    ref={provided.innerRef}
                    {...provided.draggableProps}  // 드래그 가능한 속성을 적용
                    style={{
                        ...provided.draggableProps.style,
                        marginBottom: '16px',
                    }}
                >
                    <div>
                        <GrayDeleteIcon width={24} onClick={onDelete}/>
                    </div>
                    <div css={listCardWrapper}>
                        <div css={titleWrapper}>
                            <SequenceLabel backgroundColor={colors.color.Gray3}>{sequence}</SequenceLabel>
                            <Text type="Body2">{place.name}</Text>
                        </div>
                        <div css={detailInfoWrapper}>
                            <Text type="Label21" color={colors.color.Gray1}>{place.category}</Text>
                        </div>
                    </div>
                    <div
                        {...provided.dragHandleProps}  // PlanChange 아이콘에만 드래그 핸들러 연결
                    >
                        <PlanChange width={24} />
                    </div>
                </div>
            )}
        </Draggable>
    );
}
