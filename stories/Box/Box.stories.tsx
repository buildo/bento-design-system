import { createBentoBox } from "../../src/Box/createBentoBox";
import { sprinkles } from "../sprinkles.css";

export default {
  title: "Box",
};

const Box = createBentoBox(sprinkles);

export const Primary = () => {
  return (
    <Box color="primary" fontFamily="default" padding={16}>
      Test
    </Box>
  );
};

export const CustomTokens = () => {
  return (
    <Box color="customColor1" fontFamily="customFontFamily" padding={12}>
      Test
    </Box>
  );
};
