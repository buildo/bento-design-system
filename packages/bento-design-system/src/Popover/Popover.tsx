import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { OverlayContainer, useModal, useOverlay, useOverlayPosition } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { forwardRef, RefObject, useImperativeHandle, useRef } from "react";
import { Box, Children } from "..";
import { Placement } from "@react-types/overlays";
import { BentoThemePortalProvider } from "../BentoThemeContext";

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
export const Popover = forwardRef<HTMLElement, Props>(
  ({ children, onClose, triggerRef, placement = "bottom start", offset = 4 }, ref) => {
    const overlayRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => overlayRef.current as HTMLElement);

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
      overlayRef: overlayRef,
      placement,
      offset,
      isOpen: true,
    });

    return (
      <OverlayContainer>
        <BentoThemePortalProvider>
          <FocusScope restoreFocus>
            <Box
              ref={overlayRef}
              position="absolute"
              display="flex"
              outline="none"
              {...mergeProps(overlayProps, dialogProps, modalProps, positionProps)}
            >
              {children}
            </Box>
          </FocusScope>
        </BentoThemePortalProvider>
      </OverlayContainer>
    );
  }
);

export type { Placement };
