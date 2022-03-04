import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { SprinklesProperties } from "@vanilla-extract/sprinkles/dist/declarations/src/types";
import {
  responsiveProperties as bentoResponsiveProperties,
  statusProperties as bentoStatusProperties,
  unconditionalProperties as bentoUnconditionalProperties,
} from "./util/atoms";
import { breakpoints } from "./util/breakpoints";
import { statusConditions } from "./util/conditions";

export function createDefineBentoSprinklesFn() {
  function defineBentoSprinkles<
    UP extends typeof bentoUnconditionalProperties = typeof bentoUnconditionalProperties,
    RP extends typeof bentoResponsiveProperties = typeof bentoResponsiveProperties,
    SP extends typeof bentoStatusProperties = typeof bentoStatusProperties,
    OP extends ReadonlyArray<SprinklesProperties> = []
  >(
    unconditionalProperties: UP = bentoUnconditionalProperties as any,
    responsiveProperties: RP = bentoResponsiveProperties as any,
    statusProperties: SP = bentoStatusProperties as any,
    otherProperties?: OP
  ) {
    const unconditionalStyles = defineProperties({
      properties: unconditionalProperties,
      shorthands: {
        borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
        borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
      },
    });

    const responsiveStyles = defineProperties({
      conditions: breakpoints,
      defaultCondition: "desktop",
      properties: responsiveProperties,
      shorthands: {
        inset: ["top", "right", "bottom", "left"],
        padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
        paddingX: ["paddingLeft", "paddingRight"],
        paddingY: ["paddingTop", "paddingBottom"],
      },
    });

    const statusStyles = defineProperties({
      conditions: statusConditions,
      defaultCondition: "default",
      properties: statusProperties,
    });

    const sprinkles = createSprinkles(
      unconditionalStyles,
      responsiveStyles,
      statusStyles,
      ...(otherProperties ?? [])
    );

    return { sprinkles, unconditionalStyles, responsiveStyles, statusStyles } as const;
  }

  return addFunctionSerializer(defineBentoSprinkles, {
    importPath: "@buildo/bento-design-system/src/sprinkles",
    importName: "createDefineBentoSprinklesFn",
    args: [],
  });
}
