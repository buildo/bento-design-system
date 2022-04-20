import { JSXElementConstructor, ComponentProps } from "react";
import { Box, Stack, Inline } from "./internal";
import { Title } from "./Typography/Title/Title";
import { formatMessage, IFrame } from "./createUseComponentsShowcase";

type ComponentShowcase<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P extends ComponentProps<C>
> = {
  title?: string;
  Component: C;
  variants: P[][];
  variantLineDecorator?: (C: JSX.Element) => JSX.Element;
  iframe?: boolean;
  absolute?: boolean;
};

export function componentShowcase<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P extends ComponentProps<C>
>({
  title,
  Component,
  variants,
  variantLineDecorator: decorator,
  iframe = false,
  absolute = false,
}: ComponentShowcase<C, P>): JSX.Element {
  const _content = (
    <Box background="backgroundSecondary" padding={24} borderRadius={4}>
      <Stack space={16}>
        {variants.map((variantLine, index) => {
          const line = (
            <>
              {variantLine.map((variant) => (
                <Component {...variant} />
              ))}
            </>
          );
          return (
            <Inline space={16} key={index}>
              {decorator ? decorator(line) : line}
            </Inline>
          );
        })}
      </Stack>
    </Box>
  );

  const content = absolute ? (
    <Box position="relative" style={{ height: 400 }}>
      {_content}
    </Box>
  ) : (
    _content
  );

  return (
    <Stack space={24}>
      {title ? <Title size="large">{formatMessage(title)}</Title> : null}
      {iframe ? <IFrame height={400}>{content}</IFrame> : content}
    </Stack>
  );
}
