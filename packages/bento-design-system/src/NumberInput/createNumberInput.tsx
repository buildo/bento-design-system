import { useLocale } from "@react-aria/i18n";
import { useMemo } from "react";
import useDimensions from "react-cool-dimensions";
import { Label, LocalizedString, unsafeLocalizedString } from "..";
import { Box } from "../internal";
import { inputRecipe } from "../Field/Field.css";
import { bodyRecipe } from "../Typography/Body/Body.css";
import { FormatProps } from "./FormatProps";
import { InputConfig } from "../Field/InputConfig";

type Props = {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: React.Ref<HTMLInputElement>;
  placeholder?: LocalizedString;
  validationState: "valid" | "invalid";
  disabled?: boolean;
  isReadOnly?: boolean;
} & FormatProps;

export function createNumberInput(config: InputConfig) {
  return function NumberInput(props: Props) {
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
        return code ? unsafeLocalizedString(code) : undefined;
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

    const rightAccessoryContent = ((): LocalizedString | undefined => {
      switch (props.kind) {
        case "currency":
          return currencyCode;
        case "percentage":
          return unsafeLocalizedString("%");
        case "decimal":
        case undefined:
          return undefined;
      }
    })();

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
              color: props.disabled ? "disabled" : "default",
              weight: "default",
              size: config.fontSize,
            }),
          ]}
          borderRadius={config.radius}
          paddingX={config.paddingX}
          paddingY={config.paddingY}
          display="flex"
          style={{ paddingRight: rightAccessoryWidth, flexGrow: 1 }}
        />
        {rightAccessoryContent && (
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
            <Label size="large" color={props.disabled ? "disabled" : "secondary"}>
              {rightAccessoryContent}
            </Label>
          </Box>
        )}
      </Box>
    );
  };
}

export type { Props as NumberInputProps };
