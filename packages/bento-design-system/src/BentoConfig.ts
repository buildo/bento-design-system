import { ActionsConfig } from "./Actions/Config";
import { AreaLoaderConfig } from "./AreaLoader/Config";
import { AvatarConfig } from "./Avatar/Config";
import { BannerConfig } from "./Banner/Config";
import { BreadcrumbConfig } from "./Breadcrumb/Config";
import { ButtonConfig } from "./Button/Config";
import { CardConfig } from "./Card/Config";
import { ChipConfig } from "./Chip/Config";
import { DateFieldConfig } from "./DateField/Config";
import { DisclosureConfig } from "./Disclosure/Config";
import { DisclosureGroupConfig } from "./DisclosureGroup/Config";
import { DecorativeDividerConfig } from "./Divider/Config";
import { FeedbackConfig } from "./Feedback/Config";
import {
  FieldConfig,
  InputConfig,
  SelectionControlConfig,
  SelectionControlGroupConfig,
} from "./Field/Config";
import { FormLayoutConfig } from "./Form/Config";
import { IconButtonConfig } from "./IconButton/Config";
import { InlineLoaderConfig } from "./InlineLoader/Config";
import { ListConfig } from "./List/Config";
import { MenuConfig } from "./Menu/Config";
import { ModalConfig } from "./Modal/Config";
import { NavigationConfig } from "./Navigation/Config";
import { ProgressBarConfig } from "./ProgressBar/Config";
import { SearchBarConfig } from "./SearchBar/Config";
import { DropdownConfig } from "./SelectField/Config";
import { SliderConfig } from "./Slider/Config";
import { StepperConfig } from "./Stepper/Config";
import { TableConfig } from "./Table/Config";
import { TabsConfig } from "./Tabs/Config";
import { ToastConfig } from "./Toast/Config";
import { TooltipConfig } from "./Tooltip/Config";
import { PartialDeep } from "./util/PartialDeep";

export type BentoConfig = {
  actions: ActionsConfig;
  areaLoader: AreaLoaderConfig;
  avatar: AvatarConfig;
  banner: BannerConfig;
  breadcrumb: BreadcrumbConfig;
  button: ButtonConfig;
  card: CardConfig;
  chip: ChipConfig;
  dateField: DateFieldConfig;
  decorativeDivider: DecorativeDividerConfig;
  disclosure: DisclosureConfig;
  disclosureGroup: DisclosureGroupConfig;
  feedback: FeedbackConfig;
  field: FieldConfig;
  input: InputConfig;
  selectionControl: {
    group: SelectionControlGroupConfig;
    element: SelectionControlConfig;
  };
  formLayout: FormLayoutConfig;
  iconButton: IconButtonConfig;
  inlineLoader: InlineLoaderConfig;
  list: ListConfig;
  menu: MenuConfig;
  modal: ModalConfig;
  navigation: NavigationConfig;
  searchBar: SearchBarConfig;
  dropdown: DropdownConfig;
  table: TableConfig;
  toast: ToastConfig;
  tabs: TabsConfig;
  progressBar: ProgressBarConfig;
  slider: SliderConfig;
  stepper: StepperConfig;
  tooltip: TooltipConfig;
};

export type PartialBentoConfig = PartialDeep<BentoConfig>;
