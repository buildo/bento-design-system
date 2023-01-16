import { assignInlineVars } from "@vanilla-extract/dynamic";
import { statusProperties } from "../util/atoms";
import { InputConfig } from "./Config";
import { readOnlyBackground } from "./Field.css";

export function getReadOnlyBackgroundStyle<T extends InputConfig>(config: T) {
  return assignInlineVars({
    [readOnlyBackground]: statusProperties.background[config.background.readOnly],
  });
}
