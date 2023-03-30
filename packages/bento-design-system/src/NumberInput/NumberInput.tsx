import { useLocale } from "@react-aria/i18n";
import { useMemo } from "react";
import useDimensions from "react-cool-dimensions";
import { Label, LocalizedString, Box, Children, Columns } from "..";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { FormatProps } from "./FormatProps";
import { useBentoConfig } from "../BentoConfigContext";
import { match, not, __ } from "ts-pattern";
import { getReadOnlyBackgroundStyle } from "../Field/utils";

type Props = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: React.Ref<HTMLInputElement>;
  placeholder?: LocalizedString;
  validationState: "valid" | "invalid";
  disabled?: boolean;
  isReadOnly?: boolean;
  rightAccessory?: Children;
} & FormatProps;

export function NumberInput(props: Props) {
  const config = useBentoConfig().input;
  const { locale } = useLocale();

  const { observe: rightAccessoryRef, width: rightAccessoryWidth } = useDimensions({
    // This is needed to include the padding in the width
    useBorderBoxSize: true,
  });

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

  const rightAccessory = match([props.rightAccessory, rightAccessoryContent] as const)
    .with([__.nullish, __.nullish], () => undefined)
    .with([__.nullish, not(__.nullish)], () => rightAccessoryContent)
    .with([not(__.nullish), __.nullish], () => props.rightAccessory)
    .with([not(__.nullish), not(__.nullish)], () => (
      <Columns space={config.paddingX} alignY="center">
        {props.rightAccessory}
        {rightAccessoryContent}
      </Columns>
    ))
    .exhaustive();

  return (
    <Box position="relative" display="flex">
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
          inputRecipe({ validation: props.isReadOnly ? "notSet" : props.validationState }),
          bodyRecipe({
            color: props.disabled ? "disabled" : "primary",
            weight: "default",
            size: config.fontSize,
            ellipsis: false,
          }),
        ]}
        borderRadius={config.radius}
        paddingX={config.paddingX}
        paddingY={config.paddingY}
        background={config.background.default}
        display="flex"
        style={{
          paddingRight: rightAccessoryWidth,
          flexGrow: 1,
          ...getReadOnlyBackgroundStyle(config),
        }}
      />
      {rightAccessory && (
        <Box
          ref={rightAccessoryRef}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingX={16}
          top={0}
          bottom={0}
          right={0}
        >
          {rightAccessory}
        </Box>
      )}
    </Box>
  );
}

export type { Props as NumberInputProps };
