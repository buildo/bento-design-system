import { match } from "ts-pattern";
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
    | ({
        withCopyButton: true;
        copyButtonLabel: LocalizedString;
      } & (
        | {
            copySuccessMessage: LocalizedString;
            showToastOnCopy: true;
          }
        | {
            showToastOnCopy?: false;
          }
      ))
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
        if (props.withCopyButton) {
          try {
            await navigator.clipboard.writeText(props.value);
            if (props.showToastOnCopy) {
              showToast({
                kind: "informative",
                message: props.copySuccessMessage,
                dismissable: true,
              });
            }
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

  const hasRightAccessory = props.rightAccessory != null;
  const hasCopyButtonAccessory = copyButtonAccessory != null;

  const rightAccessory = match([hasRightAccessory, hasCopyButtonAccessory] as const)
    .with([false, false], () => undefined)
    .with([false, true], () => copyButtonAccessory)
    .with([true, false], () => props.rightAccessory)
    .with([true, true], () => (
      <Columns space={inputConfig.paddingX} alignY="center">
        {props.rightAccessory}
        {copyButtonAccessory}
      </Columns>
    ))
    .exhaustive();

  return <TextField {...props} onChange={() => {}} isReadOnly rightAccessory={rightAccessory} />;
}

export type { Props as ReadOnlyFieldProps };
