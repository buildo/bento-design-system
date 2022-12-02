import { match, __, not } from "ts-pattern";
import { useBentoConfig } from "../BentoConfigContext";
import { IconButton } from "../IconButton/IconButton";
import { Columns } from "../Layout/Columns";
import { TextField, TextFieldProps } from "../TextField/TextField";
import { useToast } from "../Toast/useToast";
import { LocalizedString } from "../util/ConfigurableTypes";
import { Omit } from "../util/Omit";

type Props = Omit<
  TextFieldProps,
  "onChange" | "onBlur" | "disabled" | "isReadOnly" | "placeholder" | "issues"
> &
  (
    | {
        withCopyButton: true;
        copyButtonLabel: LocalizedString;
        copySuccessMessage: LocalizedString;
        showToastOnCopy?: boolean;
      }
    | {
        withCopyButton?: false;
      }
  );

/**
 * A convenient wrapper to the TextField, that forces isReadOnly=true
 * and doesn't require all those props that don't make sense for a read-only field (onChange, onBlur, placeholder, ...)
 */
export function ReadOnlyField(props: Props) {
  const { showToast } = useToast();
  const config = useBentoConfig().readOnlyField;
  const inputConfig = useBentoConfig().input;

  const copyButtonAccessory = props.withCopyButton ? (
    <IconButton
      icon={config.copyIcon}
      onPress={async () => {
        if (props.showToastOnCopy ?? true) {
          try {
            await navigator.clipboard.writeText(props.value);
            showToast({
              kind: "informative",
              message: props.copySuccessMessage,
              dismissable: true,
            });
          } catch {
            console.error("Could not copy to clipboard");
          }
        }
      }}
      kind="transparent"
      hierarchy="secondary"
      label={props.copyButtonLabel}
      size={config.copyIconSize}
    />
  ) : undefined;

  const rightAccessory = match([props.rightAccessory, copyButtonAccessory] as const)
    .with([__.nullish, __.nullish], () => undefined)
    .with([__.nullish, not(__.nullish)], () => copyButtonAccessory)
    .with([not(__.nullish), __.nullish], () => props.rightAccessory)
    .with([not(__.nullish), not(__.nullish)], () => (
      <Columns space={inputConfig.paddingX} alignY="center">
        {props.rightAccessory}
        {copyButtonAccessory}
      </Columns>
    ))
    .exhaustive();

  return <TextField {...props} onChange={() => {}} isReadOnly rightAccessory={rightAccessory} />;
}

export type { Props as ReadOnlyFieldProps };
