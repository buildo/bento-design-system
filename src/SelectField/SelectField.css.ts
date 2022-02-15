import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { vars } from "../vars.css";

export const control = strictRecipe({
  base: [
    { padding: "0" },
    bentoSprinkles({
      padding: 16,
      borderRadius: 8,
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

export const valueContainer = bentoSprinkles({
  padding: 16,
  gap: 8,
});

export const singleValue = style({
  gridArea: "1/1/2/3",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

export const placeholder = style({ gridArea: "1/1/2/3" });

export const input = bodyRecipe({
  size: "large",
  weight: "regular",
  color: "default",
});

export const menu = style([
  {
    marginTop: vars.space[4],
    overflow: "hidden",
  },
  bentoSprinkles({
    boxShadow: "elevationSmall",
    borderRadius: 8,
    background: "backgroundPrimary",
  }),
]);

export const optionRecipe = strictRecipe({
  base: bentoSprinkles({
    padding: 16,
    cursor: { default: "pointer", disabled: "notAllowed" },
  }),
  variants: {
    isSelected: {
      true: bentoSprinkles({ background: "transparentFocusBackground" }),
      false: bentoSprinkles({ background: { hover: "transparentHoverBackground" } }),
    },
    isFocused: {
      true: bentoSprinkles({
        background: {
          default: "transparentFocusBackground",
          hover: "transparentHoverBackground",
          focus: "transparentFocusBackground",
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
