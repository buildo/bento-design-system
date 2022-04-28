import * as React from "react";
import { InlineLoader } from "..";
import { formatMessage } from "../formatMessage";

export default function InlineLoaderExample() {
  return <InlineLoader message={formatMessage("This may take a while...")} />;
}
