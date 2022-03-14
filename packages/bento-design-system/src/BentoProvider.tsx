import { Children } from ".";
import { ToastProviderProps } from "./Toast/createToastProvider";
import { OverlayProvider } from "@react-aria/overlays";
import { DefaultMessages, DefaultMessagesContext } from "./DefaultMessagesContext";
import { LinkComponent, LinkComponentContext } from "./util/link";
import { FunctionComponent, useContext } from "react";

type Props = {
  children?: Children;
  toastDismissAfterMs?: number;
  /**
   * The component which will be used to render a link (such as in `ButtonLink`).
   * You can use this to customize the link rendering, such as using React Router's `Link` component.
   * When you do so, make sure to use the `makeLinkComponent` utility and to forward the ref to your
   * custom component, e.g.
   *
   * ```ts
   * import { Link } from "react-router-dom";
   * import { Box } from "design-system";
   *
   * const linkComponent = makeLinkComponent(({ href, ...props }, ref) => {
   *  if (href.startsWith("http")) {
   *    return <Box as="a" ref={ref} {...props} />;
   *  } else {
   *    return <Link ref={ref} to={href} {...props} />;
   *  }
   * })
   * ```
   *
   * Defaults to a regular `<a>` tag.
   */
  linkComponent?: LinkComponent;
} & DefaultMessages;

export function createBentoProvider(ToastProvider: FunctionComponent<ToastProviderProps>) {
  return function BentoProvider({
    children,
    toastDismissAfterMs = 5000,
    defaultMessages,
    linkComponent,
  }: Props) {
    const linkComponentFromContext = useContext(LinkComponentContext);

    return (
      <OverlayProvider>
        <DefaultMessagesContext.Provider value={{ defaultMessages }}>
          <LinkComponentContext.Provider value={linkComponent || linkComponentFromContext}>
            <ToastProvider dismissAfterMs={toastDismissAfterMs}>{children}</ToastProvider>
          </LinkComponentContext.Provider>
        </DefaultMessagesContext.Provider>
      </OverlayProvider>
    );
  };
}
