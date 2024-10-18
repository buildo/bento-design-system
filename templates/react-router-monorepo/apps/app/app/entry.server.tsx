import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "react-router";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter } from "react-router";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { createInstance } from "i18next";
import i18next from "./i18next.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-fs-backend";
import i18n, { registerCustomFormats } from "./i18n"; // your i18n configuration file
import * as path from "node:path";

const ABORT_DELAY = 5_000;

// Override console.erro to suppress specific warnings
const originalConsoleError = console.error;
console.error = (msg, ...args) => {
  if (typeof msg === "string" && msg.includes("useLayoutEffect")) {
    return;
  }
  if (typeof msg === "string" && msg.includes("A props object containing")) {
    return;
  }
  originalConsoleError(msg, ...args);
};

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  loadContext: AppLoadContext
) {
  return new Promise(async (resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    let readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";

    let instance = createInstance();
    let lng = await i18next.getLocale(request);
    // let ns = i18next.getRouteNamespaces(routerContext);
    let ns = ["translation"] as string[];

    await instance
      .use(initReactI18next) // Tell our instance to use react-i18next
      .use(Backend) // Setup our backend
      .init({
        ...i18n, // spread the configuration
        lng, // The locale we detected above
        ns, // The namespaces the routes about to render wants to use
        backend: {
          loadPath: path.resolve("./public/locales/{{lng}}.json"),
        },
      });

    registerCustomFormats(instance);

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={routerContext} url={request.url} abortDelay={ABORT_DELAY} />,
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
