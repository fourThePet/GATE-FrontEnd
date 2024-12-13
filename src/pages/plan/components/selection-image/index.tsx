
import { FileDelete } from "../../../../assets/svg";
import { Text } from "../../../../components";
import { SelectPlaceType } from "../../../../interfaces";
import {  deleteIcon, imageItem, imageWrapper, titleWrapper } from "./index.styles";

interface Props{
    imageUrl : string;
    name : string;
    placeId: number;
    setSelectItems?: React.Dispatch<React.SetStateAction<SelectPlaceType[]>>;
}
export default function SelectionImage({imageUrl, name, placeId, setSelectItems} : Props){
    const handleDeleteButtonClick = () => { // 장소 선택 해제
        if (placeId) {
            setSelectItems((prevSelectItems) => 
                prevSelectItems.filter(item => item.placeId !== placeId) // 선택 해제 시 해당 placeId를 가진 항목 삭제
            );
        }
    };
    return(
        <div>
            <div css={imageWrapper}>
                <img css={imageItem} src={imageUrl || '/images/stash_pin-place.png'} alt={name}></img>
                <FileDelete width={24} css={deleteIcon} onClick={handleDeleteButtonClick}/>
            </div>
            <div css={titleWrapper}>
                <Text type="Label3">{name}</Text>
            </div>
        </div>
    )
}