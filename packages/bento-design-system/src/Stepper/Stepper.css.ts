import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const stepRecipe = strictRecipe({
  variants: {
    status: {
      todo: bentoSprinkles({
        color: "textSecondary",
      }),
      inProgress: bentoSprinkles({
        color: "textInteractive",
      }),
      done: bentoSprinkles({
        color: "textSecondary",
      }),
    },
  },
});

export const stepIconRecipe = strictRecipe({
  base: bentoSprinkles({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "circled",
  }),
  variants: {
    status: {
      todo: bentoSprinkles({
        background: "backgroundOverlay",
        color: "textSecondary",
      }),
      inProgress: bentoSprinkles({
        color: "textPrimaryInverse",
        background: "backgroundInteractive",
      }),
      done: bentoSprinkles({
        color: "foregroundSecondary",
      }),
    },
  },
});
