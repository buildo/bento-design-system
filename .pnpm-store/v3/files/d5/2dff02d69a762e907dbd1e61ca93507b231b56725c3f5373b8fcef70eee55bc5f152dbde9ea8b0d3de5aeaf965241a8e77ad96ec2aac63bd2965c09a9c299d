import { useId, useLabels, mergeProps, useSlotId } from "@react-aria/utils";

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 * @param props - The props for labels and fields.
 */
export function useLabel(props) {
  let {
    id,
    label,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    labelElementType = 'label'
  } = props;
  id = useId(id);
  let labelId = useId();
  let labelProps = {};

  if (label) {
    ariaLabelledby = ariaLabelledby ? ariaLabelledby + " " + labelId : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === 'label' ? id : undefined
    };
  } else if (!ariaLabelledby && !ariaLabel) {
    console.warn('If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility');
  }

  let fieldProps = useLabels({
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby
  });
  return {
    labelProps,
    fieldProps
  };
}

/**
 * Provides the accessibility implementation for input fields.
 * Fields accept user input, gain context from their label, and may display a description or error message.
 * @param props - Props for the Field.
 */
export function useField(props) {
  let {
    description,
    errorMessage,
    validationState
  } = props;
  let {
    labelProps,
    fieldProps
  } = useLabel(props);
  let descriptionId = useSlotId([Boolean(description), Boolean(errorMessage), validationState]);
  let errorMessageId = useSlotId([Boolean(description), Boolean(errorMessage), validationState]);
  fieldProps = mergeProps(fieldProps, {
    'aria-describedby': [descriptionId, // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA. See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
    errorMessageId, props['aria-describedby']].filter(Boolean).join(' ') || undefined
  });
  return {
    labelProps,
    fieldProps,
    descriptionProps: {
      id: descriptionId
    },
    errorMessageProps: {
      id: errorMessageId
    }
  };
}
//# sourceMappingURL=module.js.map
