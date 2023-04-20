import {
  DesignSystemProvider,
  Modal as BentoModal,
  withBentoConfig,
  defaultTheme,
} from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { defaultMessages } from "@buildo/bento-design-system/lib/defaultMessages/en";

export default {
  title: "utils/withBentoConfig",
};

// This tests that `withBentoConfig` only overrides the specific config passed to it.
// In this case we check that when we customize the Modal, we don't change the
// Button configuration that was provided by the top-level DesignSystemProvider.
//
// In practice, we should see a custom Modal with its radius and padding overridden,
// and also a custom Button with its radius overridden by the top-level config.
export const ConfiguredModal = () => {
  const Modal = withBentoConfig(
    {
      modal: {
        radius: 16,
        paddingX: 80,
      },
    },
    BentoModal
  );

  return (
    <DesignSystemProvider
      defaultMessages={defaultMessages}
      config={{
        button: {
          radius: 16,
        },
      }}
      theme={defaultTheme}
    >
      <Modal
        title="Custom Modal"
        onClose={action("onClose")}
        primaryAction={{
          label: "Primary action",
          onPress: action("onPrimaryActionPress"),
        }}
      >
        Modal content
      </Modal>
    </DesignSystemProvider>
  );
};
