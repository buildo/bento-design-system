import {
  Box,
  Breadcrumb,
  LocalizedString,
  Stack,
  Headline,
  Stepper,
  StepperProps,
  Children,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";

type Props = {
  title: LocalizedString;
  steps: StepperProps["steps"];
  currentStep: number;
  children: Children;
};

export function ConfiguratorSection(props: Props) {
  const { t } = useTranslation();
  return (
    <Box padding={40} paddingTop={24}>
      <Stack space={40}>
        <Stack space={24}>
          <Breadcrumb
            items={[{ label: t("ConfigurationSection.myTheme"), href: "" }, { label: props.title }]}
          />
          <Headline size="medium">{props.title}</Headline>
          <Stepper steps={props.steps} currentStep={props.currentStep} />
        </Stack>
        {props.children}
      </Stack>
    </Box>
  );
}
