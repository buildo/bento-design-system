import * as React from "react";
import { Body, Disclosure } from "..";
import { formatMessage } from "../formatMessage";

export default function DisclosureExample() {
  return (
    <Disclosure title={formatMessage("Disclosure")} initialIsOpen={false}>
      <Body size="medium">{formatMessage("Content")}</Body>
    </Disclosure>
  );
}
