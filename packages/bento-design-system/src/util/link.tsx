import {
  AnchorHTMLAttributes,
  ComponentType,
  createContext,
  forwardRef,
  ForwardRefRenderFunction,
  useContext,
} from "react";
import { defaultConfigs } from "..";
import { Box } from "../internal";
import { LinkConfig } from "../Link/Config";

export type LinkComponentProps = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export const makeLinkComponent = (
  render: ForwardRefRenderFunction<HTMLAnchorElement, LinkComponentProps>
) => forwardRef(render);

export type LinkComponent = { component: ComponentType<LinkComponentProps>; config: LinkConfig };

export const DefaultLinkComponent = {
  component: makeLinkComponent((props, ref) => <Box as="a" ref={ref} {...props} />),
  config: defaultConfigs.link,
};

export const LinkComponentContext = createContext<LinkComponent>(DefaultLinkComponent);

export const useLinkComponent = () => {
  return useContext(LinkComponentContext);
};
