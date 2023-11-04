import {
  Box,
  Breadcrumb,
  LocalizedString,
  Stack,
  Headline,
  Stepper,
  StepperProps,
  Children,
  ContentBlock,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";

type Props = {
  title: LocalizedString;
  children: Children;
} & ({ endStep: true } | { endStep?: false; steps: StepperProps["steps"]; currentStep: number });

export function ConfiguratorSection(props: Props) {
  const { t } = useTranslation();
  return (
    <Box padding={40} paddingTop={24} flexGrow={1} overflowY="auto">
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
            {!props.endStep && <Stepper steps={props.steps} currentStep={props.currentStep} />}
          </Stack>
          {props.children}
        </Stack>
      </ContentBlock>
    </Box>
  );
}
