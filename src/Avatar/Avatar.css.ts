import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const avatarRecipe = strictRecipe({
  base: bentoSprinkles({
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  variants: {
    color: {
      grey: bentoSprinkles({ background: "softGrey" }),
      red: bentoSprinkles({ background: "softRed" }),
      orange: bentoSprinkles({ background: "softOrange" }),
      yellow: bentoSprinkles({ background: "softYellow" }),
      green: bentoSprinkles({ background: "softGreen" }),
      jade: bentoSprinkles({ background: "softJade" }),
      blue: bentoSprinkles({ background: "softBlue" }),
      indigo: bentoSprinkles({ background: "softIndigo" }),
      violet: bentoSprinkles({ background: "softViolet" }),
      pink: bentoSprinkles({ background: "softPink" }),
    },
  },
});
