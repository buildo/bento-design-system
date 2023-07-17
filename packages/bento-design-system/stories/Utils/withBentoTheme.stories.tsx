import {
  Modal as BentoModal,
  withBentoTheme,
  BentoThemeProvider,
} from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { Button, Inline } from "..";
import { newTheme } from "./withBentoTheme.css";

export default {
  title: "utils/withBentoTheme",
};

// This tests that `withBentoTheme` only overrides the specific theme passed to it.
// In this case, at top-level we're overriding the defaultTheme to set a purple background color for the hovered or focused buttons.
// In the Modal, we're overriding only the focus color, setting it to red.
// Thus, the button outside the Modal will have a purple background on hover or focus, while the button inside the Modal will have
// a purple background on hover and a red background on focus.
export const UsingTokenOverrides = () => {
  const [open, setOpen] = useState(false);

  // We override some of the DS tokens inside the Modal. These overrides will be applied in addition to the overrides defined in the
  // BentoThemeProvider below.
  const Modal = withBentoTheme(
    {
      interactiveBackgroundColor: {
        primarySolidFocusBackground: "red",
      },
    },
    BentoModal
  );

  return (
    <BentoThemeProvider
      theme={{
        // We apply token overrides on top of the default theme, applied by the global DesignSystemProvider
        interactiveBackgroundColor: {
          primarySolidHoverBackground: "purple",
          primarySolidFocusBackground: "purple",
        },
      }}
    >
      <Button kind="solid" hierarchy="primary" onPress={() => setOpen(true)} label="Open modal" />
      {open && (
        <Modal
          title="Custom Modal"
          onClose={() => setOpen(false)}
          primaryAction={{
            label: "Primary action",
            onPress: action("onPrimaryActionPress"),
          }}
        >
          Modal content
        </Modal>
      )}
    </BentoThemeProvider>
  );
};

export const UsingNewStaticTheme = () => {
  // We use a completely new static theme for the Custom Button.
  // This will totally replace the default theme applied by the parent DesignSystemProvider, only for the CustomButton.
  const CustomButton = withBentoTheme(newTheme, Button);
  return (
    <Inline space={16}>
      <Button kind="solid" hierarchy="primary" onPress={action("onPress")} label="Click me!" />
      <CustomButton
        kind="solid"
        hierarchy="primary"
        onPress={action("onPress")}
        label="Click me!"
      />
    </Inline>
  );
};

export const WithNestedTokenOverrides = () => {
  // In this case, we apply the overrides with two nested withBentoTheme hooks.
  // The resulting theme will be the default theme applied by the parent DesignSystemProvider,
  // with both the overrides applied on top of it.
  const CustomButton = withBentoTheme(
    {
      interactiveBackgroundColor: {
        primarySolidEnabledBackground: "red",
      },
    },
    withBentoTheme(
      {
        interactiveBackgroundColor: {
          primarySolidHoverBackground: "green",
        },
      },
      Button
    )
  );
  return (
    <Inline space={16}>
      <CustomButton
        kind="solid"
        hierarchy="primary"
        onPress={action("onPress")}
        label="Click me!"
      />
    </Inline>
  );
};
