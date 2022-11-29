import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const fieldHeight = createVar();

export const fileUploaderRecipe = strictRecipe({
  base: [bentoSprinkles({ borderRadius: 4 }), { height: fieldHeight }],
  variants: {
    status: {
      default: bentoSprinkles({
        outlineWidth: { default: 1, focus: 2 },
        outlineStyle: { default: "dashed", focus: "solid" },
        outlineColor: {
          default: "outlineInputEnabled",
          hover: "outlineInputHover",
          focus: "outlineInputFocus",
        },
      }),
      disabled: bentoSprinkles({
        outlineWidth: 1,
        outlineStyle: "dashed",
        outlineColor: "outlineInputDisabled",
      }),
      hasError: bentoSprinkles({
        outlineWidth: { default: 1, focus: 2 },
        outlineStyle: "dashed",
        outlineColor: "outlineNegative",
      }),
      hasFile: bentoSprinkles({
        outlineWidth: { default: 1, focus: 2 },
        outlineStyle: "solid",
        outlineColor: {
          default: "outlineInputEnabled",
          hover: "outlineInputHover",
          focus: "outlineInputFocus",
        },
      }),
      dragActive: bentoSprinkles({
        background: "backgroundSecondary",
        outlineWidth: 2,
        outlineStyle: "solid",
        outlineColor: "outlineInputFocus",
      }),
      uploading: bentoSprinkles({
        outlineWidth: { default: 1, focus: 2 },
        outlineStyle: "solid",
        outlineColor: {
          default: "outlineInputEnabled",
          hover: "outlineInputHover",
          focus: "outlineInputFocus",
        },
      }),
      uploadingWithError: bentoSprinkles({
        outlineWidth: { default: 1, focus: 2 },
        outlineStyle: "solid",
        outlineColor: "outlineNegative",
      }),
    },
  },
});

export const max4Lines = style([
  bentoSprinkles({ overflowY: "hidden" }),
  {
    display: "-webkit-box",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 4,
  },
]);
