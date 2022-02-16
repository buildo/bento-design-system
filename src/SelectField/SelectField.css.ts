import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const control = strictRecipe({
  base: [
    { padding: "0" },
    bentoSprinkles({
      background: {
        default: "backgroundPrimary",
      },
      boxShadow: { disabled: "outlineDisabled" },
      cursor: { default: "pointer", disabled: "notAllowed" },
    }),
  ],
  variants: {
    validation: { valid: {}, invalid: {} },
    menuIsOpen: { true: {} },
  },
  compoundVariants: [
    {
      variants: { menuIsOpen: false, validation: "valid" },
      style: bentoSprinkles({
        boxShadow: { default: "outlineInput", focus: "outlineInteractiveStrong" },
      }),
    },
    {
      variants: { menuIsOpen: false, validation: "invalid" },
      style: bentoSprinkles({
        boxShadow: { default: "outlineNegative", focus: "outlineNegativeStrong" },
      }),
    },
    {
      variants: { menuIsOpen: true, validation: "valid" },
      style: bentoSprinkles({ boxShadow: "outlineInteractiveStrong" }),
    },
    {
      variants: { menuIsOpen: true, validation: "invalid" },
      style: bentoSprinkles({ boxShadow: "outlineNegativeStrong" }),
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

export const menuPortalRecipe = strictRecipe({
  variants: {
    inDialog: {
      false: bentoSprinkles({ zIndex: "selectFieldMenu" }),
      true: bentoSprinkles({ zIndex: "selectFieldMenuInModal" }),
    },
  },
});
