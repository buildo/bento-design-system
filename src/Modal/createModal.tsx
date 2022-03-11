import { ComponentProps, FunctionComponent, useRef } from "react";
import {
  ActionsProps,
  ButtonProps,
  Children,
  IconButton,
  IconClose,
  LocalizedString,
  Title,
} from "..";
import { BentoSprinkles, Box, Column, Columns, Inset } from "../internal";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { modal, underlay } from "./Modal.css";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import { ModalContext } from "./ModalContext";
import { IconProps } from "../Icons/IconProps";
import { useDefaultMessages } from "../util/useDefaultMessages";

export type ModalProps = {
  title: LocalizedString;
  children: Children;
  primaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  secondaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  onClose: () => void;
  closeButtonLabel?: LocalizedString;
  isDestructive?: boolean;
  loadingMessage?: ActionsProps["loadingMessage"];
  error?: ActionsProps["error"];
};

type ModalConfig = {
  padding: BentoSprinkles["padding"];
  radius: BentoSprinkles["borderRadius"];
  titleSize: ComponentProps<typeof Title>["size"];
  closeIcon: FunctionComponent<IconProps>;
  closeIconSize: IconProps["size"];
};

export function createModal(
  Actions: React.FunctionComponent<ActionsProps>,
  config: ModalConfig = {
    padding: 24,
    radius: 8,
    titleSize: "large",
    closeIcon: IconClose,
    closeIconSize: 16,
  }
) {
  return function Modal(props: ModalProps) {
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

    const { defaultMessages } = useDefaultMessages();

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
              borderRadius={config.radius}
            >
              <Inset space={config.padding}>
                <Columns space={16} alignY="top">
                  <Title size={config.titleSize}>{props.title}</Title>
                  <Column width="content">
                    <IconButton
                      icon={config.closeIcon}
                      label={props.closeButtonLabel ?? defaultMessages.Modal.closeButtonLabel}
                      onPress={props.onClose}
                      size={config.closeIconSize}
                      tabIndex={-1}
                    />
                  </Column>
                </Columns>
              </Inset>
              <Inset spaceX={config.padding}>{props.children}</Inset>
              <Inset space={config.padding}>
                <Actions
                  primaryAction={
                    props.primaryAction
                      ? { ...props.primaryAction, isDestructive: props.isDestructive }
                      : undefined
                  }
                  secondaryAction={props.secondaryAction}
                  size="large"
                  loadingMessage={props.loadingMessage}
                  error={props.error}
                />
              </Inset>
            </Box>
          </FocusScope>
        </ModalContext.Provider>
      </Box>
    );
  };
}
