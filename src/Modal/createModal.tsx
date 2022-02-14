import { useRef } from "react";
import { ActionsProps, ButtonProps, Children, CloseButton, LocalizedString, Title } from "..";
import { Box, Column, Columns, Inset } from "../internal";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { modal, underlay } from "./Modal.css";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import { ModalContext } from "./ModalContext";

type Props = {
  title: LocalizedString;
  children: Children;
  primaryAction?: Omit<ButtonProps, "kind" | "size">;
  secondaryAction?: Omit<ButtonProps, "kind" | "size">;
  onClose: () => void;
  closeButtonLabel: LocalizedString;
  isDestructive?: boolean;
};

export function createModal(Actions: React.FunctionComponent<ActionsProps>) {
  return function Modal(props: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const { overlayProps, underlayProps } = useOverlay({ ...props, isOpen: true }, ref);

    usePreventScroll();

    const { modalProps } = useModal();

    const { dialogProps } = useDialog(
      {
        "aria-label": props.title,
        role: props.isDestructive ? "alertdialog" : "dialog",
      },
      ref
    );

    // Trigger the primary action on 'Enter' if there is one
    useKeyPressEvent(
      (key) => key.code === "Enter",
      () => props.primaryAction?.onPress()
    );

    return (
      <Box className={underlay} {...underlayProps} color={undefined}>
        <ModalContext.Provider value={true}>
          <FocusScope contain restoreFocus autoFocus>
            <Box
              className={modal}
              {...overlayProps}
              {...modalProps}
              {...dialogProps}
              color={undefined}
            >
              <Inset space="24">
                <Columns space="16" alignY="top">
                  <Title size="large">{props.title}</Title>
                  <Column width="content">
                    <CloseButton
                      label={props.closeButtonLabel}
                      onPress={props.onClose}
                      size="16"
                      tabIndex={-1}
                    />
                  </Column>
                </Columns>
              </Inset>
              <Inset spaceX="24">{props.children}</Inset>
              <Inset space="24">
                <Actions
                  primaryAction={
                    props.primaryAction
                      ? { ...props.primaryAction, isDestructive: props.isDestructive }
                      : undefined
                  }
                  secondaryAction={props.secondaryAction}
                />
              </Inset>
            </Box>
          </FocusScope>
        </ModalContext.Provider>
      </Box>
    );
  };
}
