import * as React from "react";
import { Body, Button, Modal } from "..";

export default function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        size="medium"
        kind="solid"
        hierarchy="primary"
        label="Click me!"
        onPress={() => setIsOpen(true)}
      />
      {isOpen && (
        <Modal
          title="Modal"
          onClose={() => setIsOpen(false)}
          primaryAction={{
            label: "OK",
            onPress: () => setIsOpen(false),
          }}
          secondaryAction={{
            label: "Cancel",
            onPress: () => setIsOpen(false),
          }}
        >
          <Body size="medium">Content</Body>
        </Modal>
      )}
    </>
  );
}
