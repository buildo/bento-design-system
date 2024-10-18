import {
  Link,
  Links,
  LinksFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "design-system/index.css";
import { BentoProvider, Children } from "design-system";
import "./root.css";
import i18next from "./i18next.server";
import type * as Route from "./+types.root";
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { useDefaultMessages } from "./defaultMessages";

export const links: LinksFunction = () => [];

export async function loader({ request }: Route.LoaderArgs) {
  let locale = await i18next.getLocale(request);
  return { locale };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const defaultMessages = useDefaultMessages();
  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BentoProvider
          defaultMessages={defaultMessages}
          linkComponent={({ href, ...props }) => {
            if (href.startsWith("/")) {
              return <Link to={href} {...props} />;
            }
            return <a href={href} {...props} />;
          }}
        >
          {children as Children}
        </BentoProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App({ loaderData }: Route.ComponentProps) {
  useChangeLanguage(loaderData.locale);

  return <Outlet />;
}
