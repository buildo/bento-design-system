import {
  DesignSystemProvider,
  Modal as BentoModal,
  withBentoTheme,
} from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";
import { useState } from "react";
import { Button } from "..";
import { newTheme } from "./withBentoTheme.css";

export default {};

// This tests that `withBentoTheme` only overrides the specific theme passed to it.
// In this case we check that when we customize the theme inside the Modal, we don't change the
// Button theme that was provided by the top-level DesignSystemProvider.
//
// In practice, the Button ouside the Modal should use the primary color defined by the top-level theme,
// while inside the Modal we should see a primary button with the color overridden.
export const ConfiguredModal = () => {
  const [open, setOpen] = useState(false);

  const Modal = withBentoTheme(newTheme, BentoModal);

  return (
    <DesignSystemProvider
      defaultMessages={defaultMessages}
      config={{
        button: {
          radius: 16,
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
