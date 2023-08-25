import React from "react";
import ReactDOM from "react-dom/client";
import { BentoProvider } from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";
import { App } from "./App";

import "./intl";
import "@buildo/bento-design-system/index.css";
import "@buildo/bento-design-system/defaultTheme.css";
import "./main.css";
import { sprinkles } from "./sprinkles.css";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    SprinklesFn: typeof sprinkles;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BentoProvider defaultMessages={defaultMessages} sprinkles={sprinkles}>
      <App />
    </BentoProvider>
  </React.StrictMode>
);
