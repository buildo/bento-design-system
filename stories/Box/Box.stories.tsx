import { vars } from "../../src/vars.css";
import { createBentoBox } from "../../src";
import { sprinkles } from "../sprinkles.css";
import { createRef } from "react";
import { unsafeLocalizedString } from "../../src/util/LocalizedString";

export default {
  title: "Box",
};

const Box = createBentoBox(sprinkles);

export const Primary = () => {
  return (
    <Box atoms={{ color: "primary", fontFamily: "default", padding: 16 }}>
      {unsafeLocalizedString("Test")}
    </Box>
  );
};

export const CustomTokens = () => {
  return (
    <Box atoms={{ color: "customColor1", fontFamily: "customFontFamily", padding: 12 }}>
      {unsafeLocalizedString("Test")}
    </Box>
  );
};
