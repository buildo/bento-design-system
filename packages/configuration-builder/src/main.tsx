import "@buildo/bento-design-system/index.css";
import { sprinkles } from "./sprinkles.css";
import "@buildo/bento-design-system/defaultTheme.css";
import "./main.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BentoProvider, LinkComponentProps } from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";
import { Link } from "react-router-dom";
import { App } from "./App";
import { ConfiguratorStatusProvider } from "./ConfiguratorStatusContext";

import "./intl";

function LinkComponent({ href, ...props }: LinkComponentProps) {
  return (
    <Link to={href} {...props}>
      {props.children}
    </Link>
  );
}

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    SprinklesFn: typeof sprinkles;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BentoProvider
      defaultMessages={defaultMessages}
      sprinkles={sprinkles}
      linkComponent={LinkComponent}
    >
      <ConfiguratorStatusProvider>
        <App />
      </ConfiguratorStatusProvider>
    </BentoProvider>
  </React.StrictMode>
);
