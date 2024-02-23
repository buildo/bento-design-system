import {
  Box,
  Breadcrumb,
  LocalizedString,
  Stack,
  Headline,
  Children,
  ContentBlock,
  Omit,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import {
  ConfiguratorSectionSteps,
  Props as ConfiguratorSectionStepsProps,
} from "./ConfiguratorSectionSteps";
import { SectionCompleted } from "./SectionCompleted";
import { useState } from "react";
import { ThemeSection, useConfiguratorStatusContext } from "../ConfiguratorStatusContext";

type Props<T extends string> = {
  title: LocalizedString;
  children: Children;
  sectionName: ThemeSection;
  nextSection?: {
    label: LocalizedString;
    href: string;
  };
} & Omit<ConfiguratorSectionStepsProps<T>, "onComplete">;

export function ConfiguratorSection<T extends string>(props: Props<T>) {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(false);
  const { completeSection } = useConfiguratorStatusContext();

  function onComplete() {
    setCompleted(true);
    completeSection(props.sectionName);
  }

  return (
    <Box
      padding={40}
      paddingTop={24}
      flexGrow={1}
      overflowY="auto"
      key={props.singleStep ? "singleStep" : props.currentStep}
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
          {completed ? (
            <SectionCompleted sectionTitle={props.title} nextSection={props.nextSection} />
          ) : (
            <ConfiguratorSectionSteps {...props} onComplete={onComplete}>
              {props.children}
            </ConfiguratorSectionSteps>
          )}
        </Stack>
      </ContentBlock>
    </Box>
  );
}
