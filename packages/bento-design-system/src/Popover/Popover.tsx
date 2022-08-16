import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { OverlayContainer, useModal, useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { RefObject, useRef } from "react";
import { Box, Children } from "..";
import { Placement } from "@react-types/overlays";

type Props = {
  children: Children;
  onClose: () => void;
  /**
   * The ref of the element that triggers the popover visibility
   */
  triggerRef: RefObject<HTMLElement>;
  /**
   * The preferred placement of the Popover relative to the trigger
   * @default "bottom start"
   */
  placement?: Placement;
  /**
   * The distance between the popover and the trigger
   * @default 4
   */
  offset?: number;
};

/**
 * A Popover element that is rendered in a portal and placed relative to its trigger element using a placement strategy
 * that accounts for edge cases such as not enough space to render the popover in the preferred position.
 */
export function Popover({
  children,
  onClose,
  triggerRef,
  placement = "bottom start",
  offset = 4,
}: Props) {
  const overlayRef = useRef(null);
  const { overlayProps } = useOverlay(
    {
      isOpen: true,
      isDismissable: true,
      onClose,
    },
    overlayRef
  );

  const { modalProps } = useModal();

  const { dialogProps } = useDialog({}, overlayRef);

  const { overlayProps: positionProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement,
    offset,
    isOpen: true,
  });

  return (
    <OverlayContainer>
      <FocusScope restoreFocus>
        <Box
          position="absolute"
          display="flex"
          outline="none"
          {...mergeProps(overlayProps, dialogProps, modalProps, positionProps)}
          ref={overlayRef}
        >
          {children}
        </Box>
      </FocusScope>
    </OverlayContainer>
  );
}

export type { Placement };
