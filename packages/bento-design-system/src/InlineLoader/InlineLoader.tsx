import { Box, Inline, Body, LocalizedString } from "..";
import { icon } from "./InlineLoader.css";
import { useDefaultMessages } from "../util/useDefaultMessages";
import { useBentoConfig } from "../BentoConfigContext";

type Props = {
  message?: LocalizedString;
};

export type { Props as InlineLoaderProps };

export function InlineLoader({ message }: Props) {
  const config = useBentoConfig().inlineLoader;
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
}
