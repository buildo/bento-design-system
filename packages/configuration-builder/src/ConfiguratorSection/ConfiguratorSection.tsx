import {
  Box,
  Breadcrumb,
  LocalizedString,
  Stack,
  Headline,
  Children,
  ContentBlock,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import {
  ConfiguratorSectionSteps,
  Props as ConfiguratorSectionStepsProps,
} from "./ConfiguratorSectionSteps";

type Props<T extends string> = {
  title: LocalizedString;
  children: Children;
} & (
  | { endStep: true }
  | ({
      endStep?: false;
    } & ConfiguratorSectionStepsProps<T>)
);

export function ConfiguratorSection<T extends string>(props: Props<T>) {
  const { t } = useTranslation();

  return (
    <Box
      padding={40}
      paddingTop={24}
      flexGrow={1}
      overflowY="auto"
      key={props.endStep ? "endStep" : props.currentStep}
    >
      <ContentBlock maxWidth={1440} alignSelf="center">
        <Stack space={40}>
          <Stack space={24}>
            <Breadcrumb
              items={[
                { label: t("ConfigurationSection.myTheme"), href: "/theme" },
                { label: props.title },
              ]}
            />
            <Headline size="medium">{props.title}</Headline>
          </Stack>
          {props.endStep ? (
            props.children
          ) : (
            <ConfiguratorSectionSteps {...props}>{props.children}</ConfiguratorSectionSteps>
          )}
        </Stack>
      </ContentBlock>
    </Box>
  );
}
