import * as Figma from "figma-api";
import { Ctx } from "../util/Ctx.js";
import { findChildByName } from "./util/findChildByName.js";
import { SimpleBentoConfig } from "./util/SimpleBentoConfig.js";

export function sliderConfig(ctx: Ctx): SimpleBentoConfig["slider"] {
  const { findWithVariants } = ctx.findComponentsInPage("Slider", "Slider");
  const Slider = findWithVariants({
    Range: "False",
    Extremes: "True",
    Discrete: "False",
    Status: "Enabled",
  });
  const minValueLabel = findChildByName(Slider, "Min value", "TEXT");
  const thumbInstance = findChildByName(Slider, "Thumb", "INSTANCE");
  const thumb = findChildByName(thumbInstance, "Thumb", "RECTANGLE");
  const value = findChildByName(thumbInstance, "Max value", "TEXT");
  const track = findChildByName(Slider, "Fill", "RECTANGLE");

  return {
    internalSpacing: (Slider.children[0] as Figma.Node<"FRAME">).itemSpacing,
    labelsSize: ctx.typographyVariant(minValueLabel).size,
    thumbHeight: thumb.absoluteBoundingBox.height,
    thumbInternalSpacing: thumbInstance.itemSpacing,
    thumbRadius: thumb.cornerRadius,
    thumbWidth: thumb.absoluteBoundingBox.width,
    trailColor: ctx.colorVariant(track),
    trailHeight: track.absoluteBoundingBox.height,
    trailRadius: track.cornerRadius,
    valueSize: ctx.typographyVariant(value).size,
  };
}
