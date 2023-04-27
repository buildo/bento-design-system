import {
  DesignSystemProvider,
  Modal as BentoModal,
  withBentoTheme,
} from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";
import { useState } from "react";
import { Button, Inline } from "..";
import { newTheme } from "./withBentoTheme.css";

export default {};

// This tests that `withBentoTheme` only overrides the specific theme passed to it.
// In this case, at top-level we're overriding the defaultTheme to set a purple background color for the hovered or focused buttons.
// In the Modal, we're overriding only the focus color, setting it to red.
// Thus, the button outside the Modal will have a purple background on hover or focus, while the button inside the Modal will have
// a purple background on hover and a red background on focus.
export const UsingTokenOverrides = () => {
  const [open, setOpen] = useState(false);

  const Modal = withBentoTheme(
    {
      tokenOverrides: {
        interactiveBackgroundColor: {
          primarySolidFocusBackground: "red",
        },
      },
    },
    BentoModal
  );

  return (
    <DesignSystemProvider
      defaultMessages={defaultMessages}
      theme={{
        tokenOverrides: {
          interactiveBackgroundColor: {
            primarySolidHoverBackground: "purple",
            primarySolidFocusBackground: "purple",
          },
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
    </DesignSystemProvider>
  );
};

export const UsingNewStaticTheme = () => {
  const CustomButton = withBentoTheme(
    {
      theme: newTheme,
      tokenOverrides: {
        interactiveBackgroundColor: {
          primarySolidHoverBackground: "purple",
        },
      },
    },
    Button
  );
  return (
    <DesignSystemProvider defaultMessages={defaultMessages}>
      <Inline space={16}>
        <Button kind="solid" hierarchy="primary" onPress={action("onPress")} label="Click me!" />
        <CustomButton
          kind="solid"
          hierarchy="primary"
          onPress={action("onPress")}
          label="Click me!"
        />
      </Inline>
    </DesignSystemProvider>
  );
};
