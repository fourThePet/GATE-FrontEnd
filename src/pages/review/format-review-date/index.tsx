import {
  formatDistanceToNow,
  differenceInHours,
  differenceInDays,
  differenceInSeconds,
} from "date-fns";
import { ko } from "date-fns/locale";

export default function formatReviewDate(dateString: string) {
  const reviewDate = new Date(dateString);
  const now = new Date();
  const secondsDifference = differenceInSeconds(now, reviewDate);
  const hoursDifference = differenceInHours(now, reviewDate);
  const daysDifference = differenceInDays(now, reviewDate);

  if (secondsDifference < 60) {
    return `${secondsDifference}초 전`;
  } else if (hoursDifference < 1) {
    return formatDistanceToNow(reviewDate, { addSuffix: true, locale: ko });
  } else if (hoursDifference < 24) {
    return `${hoursDifference}시간 전`;
  } else if (daysDifference < 7) {
    return `${daysDifference}일 전`;
  } else {
    return reviewDate.toLocaleDateString("ko-KR");
  }
}
