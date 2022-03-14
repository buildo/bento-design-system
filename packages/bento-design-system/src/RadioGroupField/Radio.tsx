import { innerRadioCircle, outerRadioCircleRecipe } from "./Radio.css";
import { Box } from "../internal";

export function Radio({ selected, focused }: { selected: boolean; focused: boolean }) {
  // NOTE(gabro): we can't draw svg strokes "inside" the container, so instead of modelling the radio
  // as a circle with a stroke, we model it as two overlapping circles (one outer larger circle, which
  // we use to draw the radio "border", and one smaller inner circle)
  return (
    <Box className={outerRadioCircleRecipe({ selected, focused })}>
      {selected && <Box className={innerRadioCircle} />}
    </Box>
  );
}
