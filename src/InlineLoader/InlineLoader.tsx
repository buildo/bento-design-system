import { Box, Inline } from "../internal";
import { Body, LocalizedString } from "..";
import { icon } from "./InlineLoader.css";
import { vars } from "../vars.css";
import { useDefaultMessages } from "../util/useDefaultMessages";

type Props = {
  message?: LocalizedString;
};

const Loader = (
  <svg width={16} height={16} fill={vars.foregroundColor.foregroundSecondary}>
    <path d="M8 1.5A6.5 6.5 0 0 0 1.5 8 .75.75 0 1 1 0 8a8 8 0 1 1 8 8 .75.75 0 1 1 0-1.5 6.5 6.5 0 1 0 0-13Z" />
  </svg>
);

export function InlineLoader({ message }: Props) {
  const {
    defaultMessages: {
      Loader: { loadingMessage: defaultLoadingMessage },
    },
  } = useDefaultMessages();

  const loadingMessage = message || defaultLoadingMessage;

  return (
    <Inline space={8} alignY="center">
      <Box className={icon}>{Loader}</Box>
      <Body size="medium" color="secondary">
        {loadingMessage}
      </Body>
    </Inline>
  );
}
