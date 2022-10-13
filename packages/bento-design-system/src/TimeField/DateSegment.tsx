import { useRef } from "react";
import { useDateSegment } from "@react-aria/datepicker";
import { DateFieldState, DateSegment as DateSegmentT } from "@react-stately/datepicker";
import { Box } from "../Box/Box";
import { useBentoConfig } from "../BentoConfigContext";
import { Body } from "../Typography/Body/Body";
import { dateSegment } from "./DateSegment.css";

type Props = {
  segment: DateSegmentT;
  state: DateFieldState;
  isReadonly?: boolean;
};

export function DateSegment({ segment, state, isReadonly }: Props) {
  const config = useBentoConfig().input;
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const isSpace = segment.type === "literal" && segment.text.trim().length === 0;

  return (
    <Box
      {...segmentProps}
      readOnly={isReadonly}
      className={dateSegment}
      width={isSpace ? 4 : undefined}
      ref={ref}
    >
      <Body
        color={state.isDisabled ? "disabled" : segment.isPlaceholder ? "secondary" : "default"}
        size={config.fontSize}
      >
        {segment.text}
      </Body>
    </Box>
  );
}
