import { useLocale } from "@react-aria/i18n";
import { useMemo } from "react";
import { Label, LocalizedString, Box, Children, Columns } from "..";
import { inputContainerRecipe, input } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { BaseNumberProps, FormatProps } from "./types";
import { useBentoConfig } from "../BentoConfigContext";
import { match } from "ts-pattern";
import { getReadOnlyBackgroundStyle } from "../Field/utils";
import { getRadiusPropsFromConfig } from "../util/BorderRadiusConfig";

type Props = BaseNumberProps & {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: React.Ref<HTMLInputElement>;
  numberValue: number;
  validationState: "valid" | "invalid";
  disabled?: boolean;
  name?: string;
} & FormatProps;

export function BaseNumberInput(props: Props) {
  const config = useBentoConfig().input;
  const { locale } = useLocale();

  // Memoizing the currency code calculation to avoid repeating it at every render
  const currencyCode = useMemo((): LocalizedString | undefined => {
    if (props.kind === "currency") {
      const code = Intl.NumberFormat(locale, {
        style: "currency",
        currency: props.currency,
        currencyDisplay: "code",
      })
        .formatToParts(0)
        .find(({ type }) => type === "currency")?.value;
      return code;
    } else {
      return undefined;
    }
  }, [
    locale,
    // NOTE(gabro): props.currency would cause TS to error because it's part of a union type
    // @ts-expect-error
    props.currency,
    props.kind,
  ]);

  const rightAccessoryContent = ((): Children | undefined => {
    switch (props.kind) {
      case "currency":
        return (
          <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
            {currencyCode}
          </Label>
        );
      case "percentage":
        return (
          <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
            %
          </Label>
        );
      case "decimal":
      case undefined:
        return undefined;
    }
  })();

  const hasRightAccessory = props.rightAccessory != null;
  const hasRightAccessoryContent = rightAccessoryContent != null;

  const rightAccessory = match([hasRightAccessory, hasRightAccessoryContent] as const)
    .with([false, false], () => undefined)
    .with([false, true], () => rightAccessoryContent)
    .with([true, false], () => props.rightAccessory)
    .with([true, true], () => (
      <Columns space={config.internalSpacing} alignY="center">
        {props.rightAccessory}
        {rightAccessoryContent}
      </Columns>
    ))
    .exhaustive();

  return (
    <Box
      className={inputContainerRecipe({
        validation: props.isReadOnly ? "notSet" : props.validationState,
      })}
      display="flex"
      paddingX={config.paddingX}
      paddingY={config.paddingY}
      gap={config.internalSpacing}
      disabled={props.disabled}
      {...getRadiusPropsFromConfig(config.radius)}
    >
      <Box
        as="input"
        {...props.inputProps}
        ref={props.inputRef}
        placeholder={props.placeholder}
        // NOTE(gabro): this is to please TS, since the inputProps type is very broad
        color={undefined}
        width="full"
        height={undefined}
        className={[
          input,
          bodyRecipe({
            color: props.disabled ? "disabled" : "primary",
            weight: "default",
            size: config.fontSize,
            ellipsis: false,
          }),
        ]}
        background={config.background.default}
        outline="none"
        flexGrow={1}
        style={getReadOnlyBackgroundStyle(config)}
      />
      {rightAccessory && (
        <Box display="flex" justifyContent="center" alignItems="center">
          {rightAccessory}
        </Box>
      )}
      {props.name && (
        <input
          type="hidden"
          name={props.name}
          value={isNaN(props.numberValue) ? "" : props.numberValue}
        />
      )}
    </Box>
  );
}
