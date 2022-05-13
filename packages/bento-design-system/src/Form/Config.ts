import { ActionsProps } from "../Actions/createActions";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { DisplayProps } from "../Typography/Display/Display";
import { HeadlineProps } from "../Typography/Headline/Headline";
import { TitleProps } from "../Typography/Title/Title";

export type FormConfig = {
  headerTitle:
    | { kind: "display"; size: DisplayProps["size"] }
    | { kind: "headline"; size: HeadlineProps["size"] };
  headerDescriptionSize: BodyProps["size"];
  formSpacing: BentoSprinkles["gap"];
  headerSpacing: BentoSprinkles["gap"];
  defaultActionsSize: ActionsProps["size"];
  defaultErrorBannerWidth: ActionsProps["errorBannerWidth"];
};

export type FormRowConfig = {
  rowSpacing: BentoSprinkles["gap"];
};

export type FormSectionConfig = {
  sectionTitleSize: TitleProps["size"];
  sectionDescriptionSize: BodyProps["size"];
  sectionHeaderSpacing: BentoSprinkles["gap"];
  sectionSpacing: BentoSprinkles["gap"];
};

export type FormLayoutConfig = {
  form: FormConfig;
  section: FormSectionConfig;
  row: FormRowConfig;
};
