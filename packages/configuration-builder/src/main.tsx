import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BentoProvider } from "@buildo/bento-design-system";
import { defaultMessages } from "@buildo/bento-design-system/defaultMessages/en";

import "./intl";
import "@buildo/bento-design-system/index.css";
import "@buildo/bento-design-system/defaultTheme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BentoProvider defaultMessages={defaultMessages}>
      <App />
    </BentoProvider>
  </React.StrictMode>
);
