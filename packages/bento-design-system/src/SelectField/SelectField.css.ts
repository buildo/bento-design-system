import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const control = strictRecipe({
  base: [
    bentoSprinkles({
      background: {
        default: "backgroundPrimary",
      },
      boxShadow: { disabled: "outlineInputDisabled" },
      cursor: { default: "pointer", disabled: "notAllowed" },
    }),
  ],
  variants: {
    validation: { valid: {}, invalid: {} },
    menuIsOpen: { true: {} },
    isReadOnly: {
      true: bentoSprinkles({
        cursor: {
          default: "default",
          disabled: "default",
        },
      }),
    },
  },
  compoundVariants: [
    {
      variants: { menuIsOpen: false, validation: "valid", isReadOnly: false },
      style: bentoSprinkles({
        boxShadow: {
          default: "outlineInputEnabled",
          focus: "outlineInputFocus",
          hover: "outlineInputHover",
        },
      }),
    },
    {
      variants: { menuIsOpen: false, validation: "invalid", isReadOnly: false },
      style: bentoSprinkles({
        boxShadow: { default: "outlineNegative", focus: "outlineNegativeStrong" },
      }),
    },
    {
      variants: { menuIsOpen: true, validation: "valid", isReadOnly: false },
      style: bentoSprinkles({ boxShadow: "outlineInputFocus" }),
    },
    {
      variants: { menuIsOpen: true, validation: "invalid", isReadOnly: false },
      style: bentoSprinkles({ boxShadow: "outlineNegativeStrong" }),
    },
    {
      variants: { menuIsOpen: false, validation: "valid", isReadOnly: true },
      style: bentoSprinkles({
        boxShadow: { default: "none", disabled: "none" },
        background: "backgroundSecondary",
      }),
    },
  ],
});

export const singleValue = style({
  gridArea: "1/1/2/3",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const placeholder = style({ gridArea: "1/1/2/3" });

export const menu = style([
  {
    marginTop: vars.space[4],
    overflow: "hidden",
  },
  bentoSprinkles({
    background: "backgroundPrimary",
  }),
]);

export const optionRecipe = strictRecipe({
  base: bentoSprinkles({
    cursor: { default: "pointer", disabled: "notAllowed" },
  }),
  variants: {
    isSelected: {
      true: bentoSprinkles({ background: "primaryTransparentFocusBackground" }),
      false: bentoSprinkles({ background: { hover: "primaryTransparentHoverBackground" } }),
    },
    isFocused: {
      true: bentoSprinkles({
        background: {
          default: "primaryTransparentFocusBackground",
          hover: "primaryTransparentHoverBackground",
          focus: "primaryTransparentFocusBackground",
        },
      }),
    },
  },
});
