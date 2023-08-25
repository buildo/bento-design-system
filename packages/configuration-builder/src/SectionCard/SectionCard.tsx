import {
  Body,
  Box,
  Card,
  Children,
  Column,
  Columns,
  IconProps,
  LocalizedString,
  Stack,
  Title,
} from "@buildo/bento-design-system";
import { IconCaretRight } from "../Icons/IconCaretRight";
import { match } from "ts-pattern";
import { IconCheckCircle } from "../Icons/IconCheckCircle";
import { useTranslation } from "react-i18next";

type Props = {
  name: LocalizedString;
  description: LocalizedString;
  icon: (props: IconProps) => Children;
} & (
  | {
      disabled?: false;
      onClick: () => void;
      kind: "todo" | "done";
    }
  | {
      disabled: true;
      onClick?: never;
      kind?: never;
    }
);

export function SectionCard(props: Props) {
  const { t } = useTranslation();
  const icon = match(props.kind)
    .with("todo", undefined, () =>
      props.icon({ size: 40, color: props.disabled ? "secondary" : "primary" })
    )
    .with("done", () => <IconCheckCircle size={40} color="interactive" />)
    .exhaustive();

  return (
    <Box
      onClick={props.onClick}
      cursor={props.disabled ? "default" : "pointer"}
      position="relative"
    >
      <Card padding={24} borderRadius={24}>
        <Columns space={24} alignY="center">
          <Column width="content">{icon}</Column>
          <Stack space={4}>
            <Title size="large" color={props.disabled ? "secondary" : "primary"}>
              {props.name}
            </Title>
            <Body size="small" color={props.disabled ? "secondary" : "primary"}>
              {props.description}
            </Body>
          </Stack>
          {!props.disabled && (
            <Column width="content">
              <IconCaretRight size={24} color={props.disabled ? "secondary" : "primary"} />
            </Column>
          )}
        </Columns>
        {props.disabled && (
          <Box
            background="backgroundInteractiveOverlay"
            borderTopRightRadius={24}
            borderBottomLeftRadius={24}
            display="flex"
            paddingX={24}
            paddingY={8}
            position="absolute"
            top={0}
            right={0}
          >
            <Body size="small" weight="strong" align="center">
              {t("Theme.comingSoon")}
            </Body>
          </Box>
        )}
      </Card>
    </Box>
  );
}
