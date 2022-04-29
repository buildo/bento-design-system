import * as React from "react";
import { Body, Disclosure } from "..";

export default function DisclosureExample() {
  return (
    <Disclosure title="Disclosure" initialIsOpen={false}>
      <Body size="medium">Content</Body>
    </Disclosure>
  );
}
