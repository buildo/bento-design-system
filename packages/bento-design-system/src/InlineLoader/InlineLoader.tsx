import { Box, Inline, Body, LocalizedString } from "..";
import { icon } from "./InlineLoader.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { InlineLoaderConfig } from "./Config";

type Props = {
  message?: LocalizedString;
};

export type { Props as InlineLoaderProps };

export function createInlineLoader(config: InlineLoaderConfig) {
  return function InlineLoader({ message }: Props) {
    const {
      defaultMessages: {
        Loader: { loadingMessage: defaultLoadingMessage },
      },
    } = useDefaultMessages();

    const loadingMessage = message || defaultLoadingMessage;

    return (
      <Inline space={8} alignY="center">
        <Box className={icon}>{config.spinnerIcon({ size: config.spinnerIconSize })}</Box>
        <Body size={config.messageSize} color="secondary">
          {loadingMessage}
        </Body>
      </Inline>
    );
  };
}
