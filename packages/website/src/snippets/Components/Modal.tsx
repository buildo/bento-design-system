import * as React from "react";
import { Body, Button, Modal } from "..";
import { formatMessage } from "../formatMessage";

export default function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button
        size="medium"
        kind="solid"
        hierarchy="primary"
        label={formatMessage("Click me!")}
        onPress={() => setIsOpen(true)}
      />
      {isOpen && (
        <Modal
          title={formatMessage("Modal")}
          onClose={() => setIsOpen(false)}
          primaryAction={{
            label: formatMessage("OK"),
            onPress: () => setIsOpen(false),
          }}
          secondaryAction={{
            label: formatMessage("Cancel"),
            onPress: () => setIsOpen(false),
          }}
        >
          <Body size="medium">{formatMessage("Content")}</Body>
        </Modal>
      )}
    </>
  );
}
