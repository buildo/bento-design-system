import {
  AnchorHTMLAttributes,
  ComponentType,
  createContext,
  forwardRef,
  ForwardRefRenderFunction,
  useContext,
} from "react";
import { Box } from "..";

export type LinkComponentProps = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">;

export const makeLinkComponent = (
  render: ForwardRefRenderFunction<HTMLAnchorElement, LinkComponentProps>
) => forwardRef(render);

export type LinkComponent = ComponentType<LinkComponentProps>;

export const DefaultLinkComponent = makeLinkComponent((props, ref) => (
  <Box as="a" ref={ref} {...props} />
));

export const LinkComponentContext = createContext<LinkComponent>(DefaultLinkComponent);

export const useLinkComponent = () => {
  return useContext(LinkComponentContext);
};
