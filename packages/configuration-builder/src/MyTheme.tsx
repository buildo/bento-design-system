import {
  Body,
  Box,
  Button,
  Card,
  Children,
  Headline,
  Inline,
  LocalizedString,
  SprinklesFn,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { useTranslation } from "react-i18next";
import { SectionCard } from "./SectionCard/SectionCard";
import { useConfiguratorStatusContext } from "./ConfiguratorStatusContext";
import { useNavigate } from "react-router-dom";
import foundationsImg from "./assets/Foundations.png";
import configurationImg from "./assets/Configuration.png";
import exportImg from "./assets/Export.png";
import image1 from "./assets/1.svg";
import image2 from "./assets/2.svg";
import image3 from "./assets/3.svg";
import {
  IconFigmaLogo,
  IconAtom,
  IconTextAa,
  IconSubtract,
  IconCards,
  IconLayout,
  IconDiamond,
  IconDiamondsFour,
  IconSwatches,
} from "./PhosphorIcons";

const numberImages = [image1, image2, image3];

type ColumnProps = {
  title: LocalizedString;
  description: LocalizedString;
  background: Parameters<SprinklesFn>[0]["background"];
  image: string;
  stepNumber: number;
};

function MainColumn(
  props: ColumnProps & {
    children: Children;
  }
) {
  return (
    <Box
      position="relative"
      paddingRight={24}
      display="flex"
      flexGrow={1}
      flexDirection="row"
      background={props.background}
      style={{ minWidth: 0, flexBasis: "100%" }}
    >
      <Stack space={40}>
        <Box paddingLeft={40} paddingTop={120}>
          <img src={numberImages[props.stepNumber]} alt={(props.stepNumber + 1).toString()} />
        </Box>
        <img
          src={props.image}
          alt=""
          width={314}
          height={215}
          style={{ position: "absolute", right: 0 }}
        />
        <Box flexGrow={1} display="flex">
          <Card
            padding={40}
            elevation="large"
            borderRadius={{ topLeft: 0, topRight: 80, bottomLeft: 0, bottomRight: 0 }}
          >
            <Stack space={32}>
              <Stack space={8}>
                <Headline size="small">{props.title}</Headline>
                <Body size="medium">{props.description}</Body>
              </Stack>
              {props.children}
            </Stack>
          </Card>
        </Box>
      </Stack>
    </Box>
  );
}

export function MyTheme() {
  const { t } = useTranslation();

  const { sections } = useConfiguratorStatusContext();
  const navigate = useNavigate();

  return (
    <Box display="flex" flexGrow={1} overflowY="auto" flexDirection="column">
      <Box display="flex" flexGrow={1}>
        <MainColumn
          title={t("Theme.Foundations.title")}
          description={t("Theme.Foundations.description")}
          background="linear-gradient-1"
          image={foundationsImg}
          stepNumber={0}
        >
          <Stack space={12}>
            <SectionCard
              name={t("Theme.Foundations.Colors.title")}
              description={t("Theme.Foundations.Colors.description")}
              icon={IconSwatches}
              kind={sections.colors ? "done" : "todo"}
              onClick={() => navigate("/theme/colors")}
            />
            <SectionCard
              name={t("Theme.Foundations.Typography.title")}
              description={t("Theme.Foundations.Typography.description")}
              icon={IconTextAa}
              disabled
            />
            <SectionCard
              name={t("Theme.Foundations.Elevations.title")}
              description={t("Theme.Foundations.Elevations.description")}
              icon={IconSubtract}
              disabled
            />
            <SectionCard
              name={t("Theme.Foundations.Tokens.title")}
              description={t("Theme.Foundations.Tokens.description")}
              icon={IconCards}
              disabled
            />
          </Stack>
        </MainColumn>
        <MainColumn
          title={t("Theme.Configuration.title")}
          description={t("Theme.Configuration.description")}
          background="linear-gradient-2"
          image={configurationImg}
          stepNumber={1}
        >
          <Stack space={12}>
            <SectionCard
              name={t("Theme.Configuration.General.title")}
              description={t("Theme.Configuration.General.description")}
              icon={IconLayout}
              disabled
            />
            <SectionCard
              name={t("Theme.Configuration.Components.title")}
              description={t("Theme.Configuration.Components.description")}
              icon={IconDiamond}
              disabled
            />
            <SectionCard
              name={t("Theme.Configuration.Patterns.title")}
              description={t("Theme.Configuration.Patterns.description")}
              icon={IconDiamondsFour}
              disabled
            />
          </Stack>
        </MainColumn>
        <MainColumn
          title={t("Theme.Export.title")}
          description={t("Theme.Export.description")}
          background="linear-gradient-3"
          image={exportImg}
          stepNumber={2}
        >
          <Stack space={16}>
            <Stack space={8}>
              <IconFigmaLogo size={40} color="primary" />
              <Stack space={4}>
                <Title size="medium">{t("Theme.Export.Figma.title")}</Title>
                <Body size="small">{t("Theme.Export.Figma.description")}</Body>
              </Stack>
            </Stack>
            <Inline space={0}>
              <Button
                kind="solid"
                hierarchy="primary"
                label={t("Theme.Export.Figma.action")}
                onPress={() => {}}
              />
            </Inline>
          </Stack>
          <Stack space={16}>
            <Stack space={8}>
              <IconAtom size={40} color="primary" />
              <Stack space={4}>
                <Title size="medium">{t("Theme.Export.React.title")}</Title>
                <Body size="small">{t("Theme.Export.React.description")}</Body>
              </Stack>
            </Stack>
            <Inline space={0}>
              <Button
                kind="solid"
                hierarchy="primary"
                label={t("Theme.Export.React.action")}
                onPress={() => {}}
              />
            </Inline>
          </Stack>
        </MainColumn>
      </Box>
    </Box>
  );
}
