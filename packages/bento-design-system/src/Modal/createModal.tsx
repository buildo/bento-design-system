import { FunctionComponent, useRef } from "react";
import { ActionsProps, ButtonProps, Children, LocalizedString, Title } from "..";
import { Box, Column, Columns, Inset } from "../internal";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { modalRecipe, underlay, modalBody } from "./Modal.css";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";
import { ModalContext } from "./ModalContext";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { IconButtonProps } from "../IconButton/createIconButton";
import { createPortal } from "../util/createPortal";
import { ModalConfig } from "./Config";

type Props = {
  title: LocalizedString;
  children: Children;
  primaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  secondaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  onClose: () => void;
  closeButtonLabel?: LocalizedString;
  isDestructive?: boolean;
  loadingMessage?: ActionsProps["loadingMessage"];
  error?: ActionsProps["error"];
  size?: "small" | "medium" | "large";
};

type CustomModalProps = Pick<Props, "children" | "isDestructive" | "size"> & {
  ["aria-label"]: string;
};

export function createModal(
  config: ModalConfig,
  {
    Actions,
    IconButton,
  }: {
    Actions: FunctionComponent<ActionsProps>;
    IconButton: FunctionComponent<IconButtonProps>;
  }
) {
  function CustomModal(props: CustomModalProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { overlayProps, underlayProps } = useOverlay({ ...props, isOpen: true }, ref);

    usePreventScroll();

    const { modalProps } = useModal();

    const { dialogProps } = useDialog(
      {
        "aria-label": props["aria-label"],
        role: props.isDestructive ? "alertdialog" : "dialog",
      },
      ref
    );

    return createPortal(
      <Box className={underlay} {...underlayProps} color={undefined}>
        <ModalContext.Provider value={true}>
          <FocusScope contain restoreFocus autoFocus>
            <Box
              className={modalRecipe({ size: props.size ?? "medium" })}
              {...overlayProps}
              {...modalProps}
              {...dialogProps}
              color={undefined}
              borderRadius={config.radius}
            >
              {props.children}
            </Box>
          </FocusScope>
        </ModalContext.Provider>
      </Box>
    );
  }

  function Modal(props: Props) {
    // Trigger the primary action on 'Enter' if there is one
    useKeyPressEvent(
      (key) => key.code === "Enter",
      () => props.primaryAction?.onPress()
    );

    const { defaultMessages } = useDefaultMessages();

    return (
      <CustomModal {...props} aria-label={props.title}>
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
                kind="transparent"
                hierarchy="secondary"
              />
            </Column>
          </Columns>
        </Inset>
        <Box className={modalBody} paddingX={config.padding}>
          {props.children}
        </Box>
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
      </CustomModal>
    );
  }

  return { CustomModal, Modal };
}

export type { Props as ModalProps };
