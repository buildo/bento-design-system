import { useEffect, useRef } from "react";
import {
  ActionsProps,
  ButtonProps,
  Children,
  LocalizedString,
  Title,
  Box,
  Column,
  Columns,
  Actions,
} from "..";
import { useOverlay, usePreventScroll, useModal } from "@react-aria/overlays";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { modalRecipe, underlay, modalBody } from "./Modal.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { IconButton } from "../IconButton/IconButton";
import { useCreatePortal } from "../util/useCreatePortal";
import { match } from "ts-pattern";
import { useBentoConfig } from "../BentoConfigContext";

export type ModalSize = "small" | "medium" | "large" | "wide";
export type ModalKind = "normal" | "warning" | "destructive";
type Props = {
  title: LocalizedString;
  children: Children;
  primaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  secondaryAction?: Omit<ButtonProps, "kind" | "hierarchy" | "size">;
  onClose: () => void;
  closeButtonLabel?: LocalizedString;
  /** @deprecated use kind='destructive' instead */
  isDestructive?: boolean;
  loadingMessage?: ActionsProps["loadingMessage"];
  error?: ActionsProps["error"];
  errorBannerWidth?: ActionsProps["errorBannerWidth"];
  size?: ModalSize;
  kind?: ModalKind;
  autoFocus?: boolean;
};

type CustomModalProps = Pick<Props, "children" | "isDestructive" | "size" | "autoFocus"> & {
  ["aria-label"]: string;
};

export function CustomModal(props: CustomModalProps) {
  const config = useBentoConfig().modal;
  const ref = useRef<HTMLDivElement>(null);
  const { overlayProps, underlayProps } = useOverlay({ ...props, isOpen: true }, ref);
  const createPortal = useCreatePortal();

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
    <Box className={underlay} {...underlayProps}>
      <FocusScope contain restoreFocus autoFocus={props.autoFocus ?? true}>
        <Box
          className={modalRecipe({ elevation: config.elevation })}
          {...overlayProps}
          {...modalProps}
          {...dialogProps}
          borderRadius={config.radius}
          style={{ width: config.width[props.size || "medium"] }}
        >
          {props.children}
        </Box>
      </FocusScope>
    </Box>
  );
}

export function Modal(props: Props) {
  const config = useBentoConfig().modal;
  // Trigger the primary action on 'Enter' if there is one
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.code === "Enter" && props.primaryAction?.onPress();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const { defaultMessages } = useDefaultMessages();

  const kind = props.kind == null && props.isDestructive ? "destructive" : props.kind ?? "normal";

  const icon = match(kind)
    .with("normal", () => null)
    .with("warning", (k) => config.titleIcon[k]({ color: "warning", size: config.titleIconSize }))
    .with("destructive", (k) =>
      config.titleIcon[k]({ color: "negative", size: config.titleIconSize })
    )
    .exhaustive();

  return (
    <CustomModal {...props} aria-label={props.title}>
      <Box
        paddingX={config.paddingX}
        paddingTop={config.paddingY}
        paddingBottom={config.internalSpacing}
      >
        <Columns space={16} alignY="top">
          <Columns space={16} alignY="center">
            {icon && <Column width="content">{icon}</Column>}
            <Title size={config.titleSize}>{props.title}</Title>
          </Columns>
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
      </Box>
      <Box className={modalBody} paddingX={config.paddingX}>
        {props.children}
      </Box>
      <Box
        paddingX={config.paddingX}
        paddingTop={config.internalSpacing}
        paddingBottom={config.paddingY}
      >
        <Actions
          primaryAction={
            props.primaryAction
              ? { ...props.primaryAction, isDestructive: kind === "destructive" }
              : undefined
          }
          secondaryAction={props.secondaryAction}
          size={config.actionsSize}
          loadingMessage={props.loadingMessage}
          error={props.error}
          errorBannerWidth={props.errorBannerWidth || config.defaultErrorBannerWidth}
        />
      </Box>
    </CustomModal>
  );
}

export type { Props as ModalProps };
