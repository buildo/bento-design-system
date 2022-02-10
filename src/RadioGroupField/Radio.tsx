import { innerRadioCircleRecipe, outerRadioCircleRecipe, radio } from "./Radio.css";

export function Radio({ selected, focused }: { selected: boolean; focused: boolean }) {
  // NOTE(gabro): we can't draw svg strokes "inside" the container, so instead of modelling the radio
  // as a circle with a stroke, we model it as two overlapping circles (one outer larger circle, which
  // we use to draw the radio "border", and one smaller inner circle)
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={radio}>
      <circle cx="12" cy="12" r="12" className={outerRadioCircleRecipe({ selected, focused })} />
      <circle cx="12" cy="12" className={innerRadioCircleRecipe({ selected, focused })} />
    </svg>
  );
}
