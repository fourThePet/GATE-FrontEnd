import colors from "./colors";
import { typo } from "./typo";

const theme = {
  colors,
  typo: { ...typo },
} as const;
export default theme;
