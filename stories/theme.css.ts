import { createGlobalTheme } from "@vanilla-extract/css";
import { vars as bentoVars } from "../src/vars.css";

const remBaseSize = 16;
const pixelToRem = (px: number) => `${px / remBaseSize}rem`;

createGlobalTheme(":root", bentoVars, {
  fontFamily: {
    default: "Arial",
  },
  fontSize: {
    bodySmall: pixelToRem(12),
    bodyMedium: pixelToRem(14),
    bodyLarge: pixelToRem(16),
    headlineSmall: pixelToRem(24),
    headlineMedium: pixelToRem(28),
    headlineLarge: pixelToRem(32),
    displaySmall: pixelToRem(36),
    displayMedium: pixelToRem(45),
    displayLarge: pixelToRem(57),
    labelSmall: pixelToRem(11),
    labelMedium: pixelToRem(12),
    labelLarge: pixelToRem(14),
    titleSmall: pixelToRem(14),
    titleMedium: pixelToRem(16),
    titleLarge: pixelToRem(22),
  },
  lineHeight: {
    bodySmall: pixelToRem(16),
    bodyMedium: pixelToRem(18),
    bodyLarge: pixelToRem(20),
    headlineSmall: pixelToRem(30),
    headlineMedium: pixelToRem(36),
    headlineLarge: pixelToRem(40),
    displaySmall: pixelToRem(46),
    displayMedium: pixelToRem(56),
    displayLarge: pixelToRem(72),
    labelSmall: pixelToRem(14),
    labelMedium: pixelToRem(16),
    labelLarge: pixelToRem(18),
    titleSmall: pixelToRem(18),
    titleMedium: pixelToRem(20),
    titleLarge: pixelToRem(28),
  },
  fontWeight: {
    regular: "400",
    semibold: "600",
  },
  letterSpacing: {
    "1": "0.01em",
    "2": "0.02em",
  },
  semanticColor: {
    informative: "#2D7AE5",
    positive: "#21C357",
    warning: "#F2A60D",
    negative: "#E42131",
  },
  color: {
    textPrimary: "#1A212B",
    textSecondary: "#525E6F",
    textInformative: "#004AB1",
    textPositive: "#078631",
    textWarning: "#946300",
    textNegative: "#B1000F",
    textDisabled: "#CBD4E1",
    interactivePrimaryOnEnabled: "#FFFFFF",
    interactivePrimaryOnHover: "#FFFFFF",
    interactivePrimaryOnFocus: "#FFFFFF",
    interactiveDangerOnEnabled: "#FFFFFF",
    interactiveDangerOnHover: "#FFFFFF",
    interactiveDangerOnFocus: "#FFFFFF",
    onDisabled: "#CBD4E1",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F6F8FB",
    informative: "#D8E8FF",
    positive: "#DAFCE6",
    warning: "#FFF2D2",
    negative: "#FFD4D8",
    disabled: "#ECEFF4",
    interactivePrimaryEnabled: "#000000",
    interactivePrimaryHover: "#333333",
    interactivePrimaryFocus: "#333333",
    interactiveDangerEnabled: "#CE0718",
    interactiveDangerHover: "#CE0718",
    interactiveDangerFocus: "#CE0718",
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
