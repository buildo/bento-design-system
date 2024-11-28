import { style } from "@vanilla-extract/css";

export const base = style({
  margin: 0,
  padding: 0,
  border: 0,
  boxSizing: "border-box",
  fontSize: "100%",
  font: "inherit",
  verticalAlign: "baseline",
  WebkitTapHighlightColor: "transparent",
});

const button = style({
  width: "auto",
  overflow: "visible",
  WebkitAppearance: "none",
  selectors: {
    "&::-moz-focus-inner": {
      borderStyle: "none",
      padding: 0,
    },
  },
});

const list = style({
  listStyle: "none",
});

const div = style({
  lineHeight: 0,
});

const input = style({
  appearance: "none",
  ":disabled": {
    cursor: "inherit",
  },
  selectors: {
    [`&::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration`]: {
      WebkitAppearance: "none",
    },
  },
});

const label = style({
  cursor: "inherit",
});

const a = style({
  textDecoration: "none",
  color: "inherit",
});

export const element: Partial<Record<keyof JSX.IntrinsicElements, string>> = {
  a,
  button,
  div,
  input,
  ol: list,
  ul: list,
  label,
};
