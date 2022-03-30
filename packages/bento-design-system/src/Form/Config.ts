import { ActionsProps } from "../Actions/createActions";
import { BentoSprinkles } from "../internal";
import { BodyProps } from "../Typography/Body/Body";
import { DisplayProps } from "../Typography/Display/Display";
import { TitleProps } from "../Typography/Title/Title";

export type FormConfig = {
  headerTitleSize: DisplayProps["size"];
  headerDescriptionSize: BodyProps["size"];
  formSpacing: BentoSprinkles["gap"];
  headerSpacing: BentoSprinkles["gap"];
  actionsSize: ActionsProps["size"];
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
