import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { SprinklesProperties } from "@vanilla-extract/sprinkles/dist/declarations/src/types";
import { responsiveProperties, statusProperties, unconditionalProperties } from "./util/atoms";
import { breakpoints } from "./util/breakpoints";
import { statusConditions } from "./util/conditions";

export function createDefineBentoSprinklesFn() {
  function defineBentoSprinkles<
    UP extends typeof unconditionalProperties,
    RP extends typeof responsiveProperties,
    SP extends typeof statusProperties,
    OP extends ReadonlyArray<SprinklesProperties>
  >(
    unconditionalProperties: UP,
    responsiveProperties: RP,
    statusProperties: SP,
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

    return [sprinkles, unconditionalStyles, responsiveStyles, statusStyles] as const;
  }

  return addFunctionSerializer(defineBentoSprinkles, {
    importPath: "@buildo/bento-design-system/src/sprinkles",
    importName: "createDefineBentoSprinklesFn",
    args: [],
  });
}
