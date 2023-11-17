import { BentoTheme } from "../src";

const BrandPrimary40 = "rgb(141, 93, 239)";
const BrandPrimary20 = "rgb(197, 171, 247)";
const BrandPrimary10 = "rgb(216, 199, 249)";
const white = "rgb(255, 255, 255)";
const Neutral1 = "rgb(245, 247, 249)";
const Neutral20_20 = "rgba(198, 207, 221, 0.2)";
const Neutral90 = "rgb(19, 24, 32)";
const Neutral80 = "rgb(40, 51, 67)";
const Interactive40 = "rgb(141, 93, 239)";
const Interactive10_40 = "rgba(216, 199, 249, 0.4)";
const Informative5 = "rgb(221, 234, 253)";
const Positive5 = "rgb(223, 251, 228)";
const Warning5 = "rgb(253, 240, 221)";
const Negative5 = "rgb(253, 222, 224)";
const white_80 = "rgba(255, 255, 255, 0.8)";
const Neutral90_60 = "rgba(19, 24, 32, 0.6)";
const Neutral50 = "rgb(108, 133, 167)";
const Neutral30 = "rgb(175, 189, 207)";
const Informative30 = "rgb(134, 182, 249)";
const Positive50 = "rgb(45, 230, 76)";
const Warning40 = "rgb(246, 179, 85)";
const Negative30 = "rgb(246, 136, 146)";
const Neutral40_30 = "rgba(143, 162, 188, 0.3)";
const Informative50 = "rgb(32, 120, 243)";
const Positive70 = "rgb(17, 146, 39)";
const Warning60 = "rgb(208, 126, 11)";
const Negative60 = "rgb(204, 15, 31)";
const white_0 = "rgba(255, 255, 255, 0)";
const Negative40 = "rgb(243, 89, 102)";
const Negative40_10 = "rgba(243, 89, 102, 0.1)";
const Neutral5 = "rgb(233, 236, 242)";
const Neutral20 = "rgb(198, 207, 221)";
const Neutral10_40 = "rgba(217, 223, 232, 0.4)";
const Interactive60 = "rgb(80, 20, 200)";
const black = "rgb(0, 0, 0)";
const Interactive10 = "rgb(216, 199, 249)";
const Interactive5 = "rgb(232, 223, 252)";
const Neutral60 = "rgb(82, 105, 137)";
const Neutral40_20 = "rgba(143, 162, 188, 0.2)";
const Neutral40 = "rgb(143, 162, 188)";
const Indigo10 = "rgb(202, 217, 247)";
const Violet10 = "rgb(229, 210, 239)";
const Pink10 = "rgb(248, 201, 228)";
const Red10 = "rgb(254, 195, 207)";
const Orange10 = "rgb(254, 215, 195)";
const Yellow10 = "rgb(255, 242, 194)";
const Green10 = "rgb(227, 243, 206)";
const Jade10 = "rgb(203, 246, 224)";
const Blue10 = "rgb(195, 239, 254)";
const Grey10 = "rgb(217, 223, 232)";
const Indigo30 = "rgb(145, 176, 238)";
const Violet30 = "rgb(200, 161, 221)";
const Pink30 = "rgb(240, 143, 199)";
const Red30 = "rgb(253, 129, 154)";
const Orange30 = "rgb(252, 171, 130)";
const Yellow30 = "rgb(255, 227, 128)";
const Green30 = "rgb(198, 230, 153)";
const Jade30 = "rgb(147, 236, 191)";
const Blue30 = "rgb(130, 222, 252)";
const Grey30 = "rgb(175, 189, 207)";

export const theme: BentoTheme = {
  brandColor: {
    brandPrimary: BrandPrimary40,
    brandSecondary: BrandPrimary20,
    brandTertiary: BrandPrimary10,
  },
  backgroundColor: {
    backgroundPrimary: white,
    backgroundSecondary: Neutral1,
    backgroundOverlay: Neutral20_20,
    backgroundPrimaryInverse: Neutral90,
    backgroundSecondaryInverse: Neutral80,
    backgroundInteractive: Interactive40,
    backgroundInteractiveOverlay: Interactive10_40,
    backgroundInformative: Informative5,
    backgroundPositive: Positive5,
    backgroundWarning: Warning5,
    backgroundNegative: Negative5,
    backgroundLightScrim: white_80,
    backgroundDarkScrim: Neutral90_60,
  },
  foregroundColor: {
    foregroundPrimary: Neutral90,
    foregroundSecondary: Neutral50,
    foregroundPrimaryInverse: Neutral1,
    foregroundSecondaryInverse: Neutral30,
    foregroundInteractive: Interactive40,
    foregroundInformative: Informative30,
    foregroundPositive: Positive50,
    foregroundWarning: Warning40,
    foregroundNegative: Negative30,
    foregroundDisabled: Neutral40_30,
  },
  textColor: {
    textPrimary: Neutral90,
    textSecondary: Neutral50,
    textPrimaryInverse: Neutral1,
    textSecondaryInverse: Neutral30,
    textInteractive: Interactive40,
    textInformative: Informative50,
    textPositive: Positive70,
    textWarning: Warning60,
    textNegative: Negative60,
    textDisabled: Neutral40_30,
  },
  interactiveBackgroundColor: {
    primarySolidEnabledBackground: Positive50,
    primarySolidHoverBackground: Positive70,
    primarySolidFocusBackground: Positive70,
    primaryTransparentEnabledBackground: white_0,
    primaryTransparentHoverBackground: Interactive10_40,
    primaryTransparentFocusBackground: Interactive10_40,
    dangerSolidEnabledBackground: Negative40,
    dangerSolidHoverBackground: Negative40,
    dangerSolidFocusBackground: Negative40,
    dangerTransparentEnabledBackground: white_0,
    dangerTransparentHoverBackground: Negative40_10,
    dangerTransparentFocusBackground: Negative40_10,
    secondarySolidEnabledBackground: Neutral5,
    secondarySolidHoverBackground: Neutral20,
    secondarySolidFocusBackground: Neutral20,
    secondaryTransparentEnabledBackground: white_0,
    secondaryTransparentHoverBackground: Neutral10_40,
    secondaryTransparentFocusBackground: Neutral10_40,
    disabledSolidBackground: Neutral20_20,
    disabledTransparentBackground: white_0,
  },
  interactiveForegroundColor: {
    primarySolidEnabledForeground: white,
    primarySolidHoverForeground: white,
    primarySolidFocusForeground: white,
    primaryTransparentEnabledForeground: Interactive40,
    primaryTransparentHoverForeground: Interactive60,
    primaryTransparentFocusForeground: Interactive60,
    dangerSolidEnabledForeground: white,
    dangerSolidHoverForeground: white,
    dangerSolidFocusForeground: white,
    dangerTransparentEnabledForeground: Negative40,
    dangerTransparentHoverForeground: Negative60,
    dangerTransparentFocusForeground: Negative60,
    secondarySolidEnabledForeground: Neutral90,
    secondarySolidHoverForeground: Neutral90,
    secondarySolidFocusForeground: Neutral90,
    secondaryTransparentEnabledForeground: Neutral80,
    secondaryTransparentHoverForeground: black,
    secondaryTransparentFocusForeground: black,
    disabledSolidForeground: Neutral40_30,
    disabledTransparentForeground: Neutral40_30,
    linkEnabled: Interactive40,
    linkHover: Interactive60,
    linkFocus: Interactive60,
    linkDisabled: Neutral40_30,
    linkEnabledInverse: Interactive10,
    linkHoverInverse: Interactive5,
    linkFocusInverse: Interactive5,
    linkDisabledInverse: Neutral60,
  },
  outlineColor: {
    outlineInteractive: Interactive40,
    outlineDecorative: Neutral20,
    outlineContainer: Neutral40_20,
    outlineInputEnabled: Neutral40,
    outlineInputHover: Neutral60,
    outlineInputFocus: Interactive40,
    outlineInputDisabled: Neutral40_30,
    outlineInformative: Informative30,
    outlinePositive: Positive50,
    outlineWarning: Warning40,
    outlineNegative: Negative30,
    outlineInteractivePrimaryEnabled: Interactive40,
    outlineInteractivePrimaryHover: Interactive60,
    outlineInteractivePrimaryFocus: Interactive60,
    outlineInteractiveSecondaryEnabled: Neutral80,
    outlineInteractiveSecondaryHover: black,
    outlineInteractiveSecondaryFocus: black,
    outlineInteractiveDangerEnabled: Negative40,
    outlineInteractiveDangerHover: Negative60,
    outlineInteractiveDangerFocus: Negative60,
    outlineInteractiveDisabled: Neutral40_30,
  },
  dataVisualizationColor: {
    softIndigo: Indigo10,
    softViolet: Violet10,
    softPink: Pink10,
    softRed: Red10,
    softOrange: Orange10,
    softYellow: Yellow10,
    softGreen: Green10,
    softJade: Jade10,
    softBlue: Blue10,
    softGrey: Grey10,
    brightIndigo: Indigo30,
    brightViolet: Violet30,
    brightPink: Pink30,
    brightRed: Red30,
    brightOrange: Orange30,
    brightYellow: Yellow30,
    brightGreen: Green30,
    brightJade: Jade30,
    brightBlue: Blue30,
    brightGrey: Grey30,
  },
};
