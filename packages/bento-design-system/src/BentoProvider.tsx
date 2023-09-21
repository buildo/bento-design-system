import { Children, PartialBentoConfig } from ".";
import { bentoSprinkles } from "./internal";
import { ToastProvider } from "./Toast/ToastProvider";
import { OverlayProvider } from "@react-aria/overlays";
import { DefaultMessages, DefaultMessagesContext } from "./DefaultMessagesContext";
import { LinkComponentContext, LinkComponentProps } from "./util/link";
import { ComponentType, useContext } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { BentoConfigProvider } from "./BentoConfigContext";
import { SprinklesFn } from "./util/ConfigurableTypes";
import { SprinklesContext } from "./SprinklesContext";
import { BentoTheme, BentoThemeProvider } from "./BentoThemeContext";

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
  linkComponent?: ComponentType<LinkComponentProps>;
  locale?: string;
  config?: PartialBentoConfig;
  /**
   * The theme to apply to the app via a wrapper Box.
   * If no theme is provided, no wrapper will be created. In this case, the user
   * will be responsible for applying the theme to the app by either importing a global theme
   * (e.g. created with `createGlobalTheme`) or wrapping the app manually in a Box with a theme applied.
   */
  theme?: BentoTheme;
  sprinkles?: SprinklesFn;
} & DefaultMessages;

export function createBentoProvider(
  config?: PartialBentoConfig,
  sprinkles?: SprinklesFn
): (props: Props) => JSX.Element;

export function createBentoProvider(
  config?: PartialBentoConfig,
  theme?: BentoTheme,
  sprinkles?: SprinklesFn
): (props: Props) => JSX.Element;

export function createBentoProvider(
  config: PartialBentoConfig = {},
  themeOrSprinkles?: BentoTheme | SprinklesFn,
  sprinkles_?: SprinklesFn
) {
  let sprinkles: SprinklesFn = bentoSprinkles;
  let theme: BentoTheme | undefined = undefined;
  if (typeof themeOrSprinkles === "function") {
    sprinkles = themeOrSprinkles;
  }
  if (typeof themeOrSprinkles === "object") {
    theme = themeOrSprinkles;
    sprinkles = sprinkles_ ?? bentoSprinkles;
  }

  function OptionalThemeWrapper(props: { children: Children; theme?: BentoTheme }) {
    if (!props.theme) return <>{props.children}</>;
    return <BentoThemeProvider theme={props.theme}>{props.children}</BentoThemeProvider>;
  }

  return function BentoProvider({
    children,
    toastDismissAfterMs = 5000,
    defaultMessages,
    linkComponent,
    locale,
    ...props
  }: Props) {
    const linkComponentFromContext = useContext(LinkComponentContext);
    return (
      <I18nProvider locale={locale}>
        <OverlayProvider style={{ height: "100%" }}>
          <DefaultMessagesContext.Provider value={{ defaultMessages }}>
            <BentoConfigProvider value={props.config ?? config}>
              <OptionalThemeWrapper theme={props.theme || theme}>
                <SprinklesContext.Provider value={props.sprinkles ?? sprinkles}>
                  <LinkComponentContext.Provider value={linkComponent ?? linkComponentFromContext}>
                    <ToastProvider dismissAfterMs={toastDismissAfterMs}>{children}</ToastProvider>
                  </LinkComponentContext.Provider>
                </SprinklesContext.Provider>
              </OptionalThemeWrapper>
            </BentoConfigProvider>
          </DefaultMessagesContext.Provider>
        </OverlayProvider>
      </I18nProvider>
    );
  };
}

export const BentoProvider = createBentoProvider();

export const DesignSystemProvider = BentoProvider;
