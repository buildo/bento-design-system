import { createGlobalTheme } from "@vanilla-extract/css";
import { vars as bentoVars } from "../src/vars.css";

createGlobalTheme(":root", bentoVars, {
  fontFamily: {
    default: "Arial",
  },
  fontSize: {
    12: "0.75rem",
    14: "0.875rem",
    16: "1rem",
  },
  lineHeight: {
    16: "1rem",
    18: "1.125rem",
    20: "1.25rem",
  },
  fontWeight: {
    regular: "400",
    semibold: "600",
  },
  letterSpacing: {
    "1": "0.01em",
    "2": "0.02em",
  },
  color: {
    primary: "#F05D68",
    neutral10: "#F5F7FA",
    neutral20: "#E4E8EE",
    neutral30: "#C8D0DB",
    neutral40: "#A4B0C0",
    neutral50: "#7C8B9F",
    neutral60: "#56677B",
    neutral70: "#38485A",
    neutral80: "#24303F",
    neutral90: "#17202B",
    info05: "#E7F5FF",
    info60: "#3084DB",
    info80: "#2660B6",
    positive05: "#E6FCF5",
    positive60: "#31A56B",
    positive80: "#248152",
    warning05: "#FFF8E1",
    warning60: "#F56708",
    warning80: "#C74600",
    negative05: "#FEEAED",
    negative60: "#E03131",
    negative80: "#C11F24",
    white: "#FFFFFF",
    black: "#000000",
    transparent: "transparent",
  },
  space: {
    "0": "0",
    "4": "4px",
    "8": "8px",
    "16": "16px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "80": "80px",
  },
});

export const vars = createGlobalTheme(":root", {
  fontFamily: {
    customFontFamily: "sans-serif",
  },
  color: {
    customColor1: "#3C6FD6",
  },
  space: {
    "12": "12px",
  },
});
