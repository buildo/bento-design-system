import { vars } from "../../src/vars.css";
import { createBox } from "../../src";
import { sprinkles } from "../sprinkles.css";

export default {
  title: "Box",
};

const Box = createBox(sprinkles);

export const Primary = () => {
  return <Box color="primary">Test</Box>;
};

export const CustomTokens = () => {
  return (
    <Box color="customColor1" fontFamily="customFontFamily" padding="16">
      Test
    </Box>
  );
};
