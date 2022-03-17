import { bentoSprinkles } from "../internal/sprinkles.css";

export const link = bentoSprinkles({
  cursor: {
    default: "pointer",
    disabled: "notAllowed",
  },
  outline: "none",
  color: {
    default: "linkEnabled",
    hover: "linkHover",
    focus: "linkFocus",
    disabled: "linkDisabled",
  },
});
