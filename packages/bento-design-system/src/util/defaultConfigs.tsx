import type { ActionsConfig } from "../Actions/Config";
import type { AreaLoaderConfig } from "../AreaLoader/Config";
import type { AvatarConfig } from "../Avatar/Config";
import type { BannerConfig } from "../Banner/Config";
import type { BreadcrumbConfig } from "../Breadcrumb/Config";
import {
  IconPositive,
  IconChevronRight,
  IconClose,
  IconIdea,
  IconInformative,
  IconNegative,
  IconUser,
  IconWarning,
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconChevronLeft,
  IconInfo,
  IconSpinner,
  IconEyeClosed,
  IconEye,
  IconCopyLight,
} from "../Icons";
import type { ButtonConfig } from "../Button/Config";
import type { CardConfig } from "../Card/Config";
import type { ChipConfig } from "../Chip/Config";
import type { DisclosureConfig } from "../Disclosure/Config";
import type { DisclosureGroupConfig } from "../DisclosureGroup/Config";
import { IllustrationNegative, IllustrationPositive, IllustrationSearch } from "../Illustrations";
import type { FeedbackConfig } from "../Feedback/Config";
import type {
  FieldConfig,
  InputConfig,
  SelectionControlConfig,
  SelectionControlGroupConfig,
} from "../Field/Config";
import type { FormLayoutConfig } from "../Form/Config";
import type { IconButtonConfig } from "../IconButton/Config";
import type { ListConfig } from "../List/Config";
import type { MenuConfig } from "../Menu/Config";
import type { ModalConfig } from "../Modal/Config";
import type { NavigationConfig } from "../Navigation/Config";
import type { SearchBarConfig } from "../SearchBar/Config";
import type { DropdownConfig } from "../SelectField/Config";
import type { TableConfig } from "../Table/Config";
import type { TabsConfig } from "../Tabs/Config";
import type { ToastConfig } from "../Toast/Config";
import type { ProgressBarConfig } from "../ProgressBar/Config";
import type { StepperConfig } from "../Stepper/Config";
import type { SliderConfig } from "../Slider/Config";
import type { TooltipConfig } from "../Tooltip/Config";
import type { InlineLoaderConfig } from "../InlineLoader/Config";
import type { DecorativeDividerConfig } from "../Divider/Config";
import type { DateFieldConfig } from "../DateField/Config";
import type { ReadOnlyFieldConfig } from "../ReadOnlyField/Config";
import type { FileUploaderFieldConfig } from "../FileUploaderField/Config";
import type { ChartConfig } from "../Charts/Config";

export const actions: ActionsConfig = {
  primaryActionButtonKind: "solid",
  secondaryActionButtonKind: "transparent",
  buttonsAlignment: "right",
  primaryPosition: "right",
  spaceBetweenButtons: 16,
  defaultSize: "medium",
  defaultErrorBannerWidth: "content",
};

export const areaLoader: AreaLoaderConfig = {
  dots: [{ color: "brandPrimary" }, { color: "brandSecondary" }, { color: "brandTertiary" }],
  scrimColor: "dark",
  messageColor: "primary",
  messageSize: "medium",
  readabilityAreaColor: "primary",
  readabilityAreaBorderRadius: 24,
};

export const avatar: AvatarConfig = {
  width: 48,
  height: 48,
  radius: "circled",
  labelSize: "large",
  icon: IconUser,
  iconSize: 24,
  outline: "none",
};

export const banner: BannerConfig = {
  paddingX: 16,
  paddingY: 16,
  titleSize: "medium",
  descriptionSize: "medium",
  radius: 16,
  closeIcon: IconClose,
  closeIconSize: 16,
  semanticIcons: {
    informative: IconInformative,
    positive: IconPositive,
    warning: IconWarning,
    negative: IconNegative,
    secondary: IconIdea,
  },
  semanticIconSize: {
    withoutTitle: 24,
    withTitle: 24,
  },
  outline: false,
  buttonKind: "transparent",
  buttonSize: "small",
};

export const breadcrumb: BreadcrumbConfig = {
  fontSize: "medium",
  separator: IconChevronRight,
  separatorSize: 12,
  space: 16,
};

export const button: ButtonConfig = {
  paddingX: {
    small: 16,
    medium: 16,
    large: 24,
  },
  paddingY: {
    small: 8,
    medium: 12,
    large: 16,
  },
  labelSize: "large",
  radius: 16,
  internalSpacing: 12,
  iconSize: {
    small: 24,
    medium: 24,
    large: 24,
  },
  uppercaseLabel: false,
  defaultSize: "medium",
  defaultIconPosition: "leading",
};

export const card: CardConfig = {
  defaultRadius: 24,
};

export const chart: ChartConfig = {
  defaultDataColors: [
    "brightRed",
    "brightBlue",
    "brightGreen",
    "brightIndigo",
    "brightJade",
    "brightViolet",
    "brightOrange",
    "brightPink",
  ],
};

export const chip: ChipConfig = {
  paddingX: 12,
  paddingY: 4,
  label: { kind: "label", size: "small" },
  iconSize: 16,
  closeIcon: IconClose,
  closeIconSize: 16,
  spacingAfterIcon: 4,
  spacingAfterLabel: 8,
  customColors: {},
  radius: "circledX",
  uppercase: false,
};

export const decorativeDivider: DecorativeDividerConfig = {
  height: 2,
  radius: "circledX",
  color: "brandSecondary",
};

export const disclosure: DisclosureConfig = {
  internalSpacing: 16,
  titleSize: {
    1: "medium",
    2: "small",
  },
  defaultIconPosition: "trailing",
  icons: {
    open: IconChevronUp,
    closed: IconChevronDown,
  },
  iconSize: {
    1: 24,
    2: 16,
  },
};

export const disclosureGroup: DisclosureGroupConfig = {
  groupSpacing: 40,
  disclosureSpacing: 24,
  defaultIconPosition: "trailing",
};

export const feedback: FeedbackConfig = {
  background: null,
  positiveIllustration: IllustrationPositive,
  negativeIllustration: IllustrationNegative,
  title: {
    medium: { kind: "title", size: "large" },
    large: { kind: "display", size: "small" },
  },
  descriptionSize: {
    medium: "medium",
    large: "medium",
  },
  illustrationSize: {
    medium: 80,
    large: 160,
  },
  action: {
    medium: {
      kind: "transparent",
      hierarchy: "primary",
      size: "medium",
    },
    large: {
      kind: "solid",
      hierarchy: "primary",
      size: "large",
    },
  },
  maxWidth: {
    medium: 280,
    large: 440,
  },
};

export const field: FieldConfig = {
  label: { size: "small", color: "secondary" },
  assistiveText: {
    size: "small",
    paddingLeft: 16,
  },
  internalSpacing: 4,
  tip: {
    icon: IconInfo,
    iconSize: 12,
    placement: "right",
  },
};

export const fileUploaderField: FileUploaderFieldConfig = {
  defaultHeight: "8rem",
  buttonKind: "outline",
};

export const inlineLoader: InlineLoaderConfig = {
  messageSize: "medium",
  spinnerIcon: IconSpinner,
  spinnerIconSize: 16,
};

export const input: InputConfig = {
  radius: 16,
  paddingX: 16,
  paddingY: 12,
  fontSize: "large",
  internalSpacing: 16,
  background: { default: "backgroundPrimary", readOnly: "backgroundSecondary" },
  passwordIconSize: 24,
  passwordShowIcon: IconEye,
  passwordHideIcon: IconEyeClosed,
};

export const selectionControl: {
  group: SelectionControlGroupConfig;
  element: SelectionControlConfig;
} = {
  group: {
    internalSpacing: {
      horizontal: 24,
      vertical: 16,
    },
  },
  element: {
    labelPaddingTop: 0,
    controlLabelSpacing: 8,
    labelSize: "large",
    checkboxBorderRadius: 8,
  },
};

export const formLayout: FormLayoutConfig = {
  form: {
    headerTitle: {
      kind: "display",
      size: "small",
    },
    headerDescriptionSize: "medium",
    formSpacing: 40,
    headerSpacing: 16,
    defaultActionsSize: "medium",
    defaultErrorBannerWidth: "content",
  },
  section: {
    sectionTitleSize: "large",
    sectionDescriptionSize: "medium",
    sectionHeaderSpacing: 8,
    sectionSpacing: 24,
  },
  row: {
    rowSpacing: 16,
  },
};

export const iconButton: IconButtonConfig = {
  radius: 16,
  padding: {
    8: 8,
    12: 8,
    16: 16,
    24: 16,
  },
};

export const list: ListConfig = {
  item: {
    borderRadius: 16,
    paddingX: {
      medium: 12,
      large: 12,
    },
    paddingY: {
      medium: 8,
      large: 12,
    },
    fontSize: {
      firstLine: "medium",
      secondLine: "small",
      overline: "small",
    },
    internalSpacing: 12,
    iconSize: {
      leading: 24,
      trailing: 24,
      illustration: 32,
    },
    iconColor: {
      leading: "primary",
      trailing: "primary",
      illustration: "default",
    },
  },
  spacing: 4,
};

export const menu: MenuConfig = {
  paddingX: 8,
  paddingY: 8,
  radius: 24,
  elevation: "medium",
  headerPaddingX: 24,
  headerPaddingY: 24,
  defaultOffset: 4,
  nestedMenuIcon: IconChevronRight,
};

export const modal: ModalConfig = {
  paddingX: 24,
  paddingY: 24,
  radius: 24,
  titleSize: "large",
  closeIcon: IconClose,
  closeIconSize: 16,
  width: {
    small: 400,
    medium: 560,
    large: 720,
    wide: 1000,
  },
  elevation: "large",
  titleIcon: {
    warning: IconWarning,
    destructive: IconNegative,
  },
  titleIconSize: 24,
  defaultErrorBannerWidth: "content",
  actionsSize: "medium",
  internalSpacing: 24,
};

export const navigation: NavigationConfig = {
  destinationPaddingX: {
    medium: 16,
    large: 24,
  },
  destinationPaddingY: {
    medium: 12,
    large: 16,
  },
  destinationsSpacing: 0,
  iconSize: {
    medium: 24,
    large: 24,
  },
  illustrationSize: {
    medium: 24,
    large: 24,
  },
  internalSpacing: {
    medium: 8,
    large: 8,
  },
  labelSize: {
    medium: "medium",
    large: "large",
  },
  activeVisualElement: {
    lineColor: "foregroundInteractive",
    lineHeight: {
      medium: 4,
      large: 4,
    },
  },
  uppercaseLabel: false,
};

export const readOnlyField: ReadOnlyFieldConfig = {
  copyIcon: IconCopyLight,
  copyIconSize: 24,
};

export const searchBar: SearchBarConfig = {
  ...input,
  clearIcon: IconClose,
  clearIconSize: 16,
  searchIcon: IconSearch,
  searchIconSize: 24,
};

export const dropdown: DropdownConfig = {
  elevation: "medium",
  radius: 24,
  menuPaddingX: 8,
  menuPaddingY: 8,
  list: {
    item: {
      borderRadius: 16,
      paddingX: {
        medium: 12,
        large: 12,
      },
      paddingY: {
        medium: 8,
        large: 12,
      },
      fontSize: {
        firstLine: "medium",
        secondLine: "small",
        overline: "small",
      },
      internalSpacing: 12,
      iconSize: {
        leading: 24,
        trailing: 24,
        illustration: 32,
      },
      iconColor: {
        leading: "primary",
        trailing: "primary",
        illustration: "default",
      },
    },
    spacing: 4,
  },
  defaultMenuSize: "large",
  openIndicatorIcon: IconChevronDown,
  openIndicatorIconSize: 24,
  chipColor: "indigo",
  chipSpacing: 4,
};

export const table: TableConfig = {
  headerInfoIcon: IconInformative,
  emptyIllustration: IllustrationSearch,
  headerBackgroundColor: "backgroundPrimary",
  headerForegroundColor: "foregroundPrimary",
  hintPlacement: "top",
  cellTooltipPlacement: "bottom",
  evenRowsBackgroundColor: "backgroundSecondary",
  selectedRowBackgroundColor: "backgroundInteractiveOverlay",
  padding: {
    header: { paddingX: 16, paddingY: 8 },
    defaultCell: { paddingX: 16, paddingY: 16 },
    buttonCell: { paddingX: 8, paddingY: 8 },
    buttonLinkCell: { paddingX: 8, paddingY: 8 },
    textCell: { paddingX: 16, paddingY: 16 },
    textWithIconCell: { paddingX: 16, paddingY: 16 },
    chipCell: { paddingX: 16, paddingY: 16 },
    labelCell: { paddingX: 16, paddingY: 16 },
    linkCell: { paddingX: 16, paddingY: 16 },
    iconCell: { paddingX: 16, paddingY: 16 },
    iconButtonCell: { paddingX: 16, paddingY: 16 },
  },
  boundaryPadding: 8,
};

export const toast: ToastConfig = {
  paddingX: 24,
  paddingY: 12,
  radius: 16,
  messageSize: "medium",
  closeIcon: IconClose,
  closeIconSize: 16,
  outline: false,
  internalSpacing: 16,
  elevation: "none",
  buttonKind: "transparent",
  buttonSize: "small",
};

const tabsBaseConfig = {
  tabsWidth: "fit-content",
  tabsAlignment: "left",
  spaceBetweenTabs: 0,
  internalSpacing: 8,
  paddingY: {
    medium: 12,
    large: 16,
  },
  labelSize: {
    medium: "medium",
    large: "large",
  },
  uppercaseLabel: false,
  iconSize: 24,
  notificationSize: 8,
  notificationColor: "foregroundInteractive",
} as const;

export const folderTabs: TabsConfig = {
  ...tabsBaseConfig,
  kind: "folder",
  radius: 16,
  paddingX: {
    medium: 40,
    large: 40,
  },
};

export const underlineTabs: TabsConfig = {
  ...tabsBaseConfig,
  kind: "underline",
  paddingX: {
    medium: 24,
    large: 24,
  },
  lineHeight: {
    medium: 2,
    large: 2,
  },
  lineColor: {
    default: "transparent",
    hover: "foregroundSecondary",
    focus: "foregroundSecondary",
    active: "foregroundInteractive",
  },
};

export const tabs: TabsConfig = folderTabs;

export const progressBar: ProgressBarConfig = {
  height: 8,
  radius: "circledX",
  discreteInternalSpacing: 8,
};

export const slider: SliderConfig = {
  valueSize: "large",
  labelsSize: "large",
  internalSpacing: 16,
  trailColor: "brandPrimary",
  trailRadius: "circledX",
  trailHeight: 8,
  thumbWidth: 24,
  thumbHeight: 24,
  thumbRadius: 8,
  thumbInternalSpacing: 8,
};

export const stepper: StepperConfig = {
  spaceBetweenSteps: 40,
  internalSpacing: 8,
  labelSize: "large",
  numberSize: "large",
  labelUppercase: false,
  doneIcon: IconPositive,
};

export const tooltip: TooltipConfig = {
  paddingX: 16,
  paddingY: 8,
  radius: 12,
  labelSize: "small",
};

export const dateField: DateFieldConfig = {
  radius: 24,
  padding: 24,
  elevation: "medium",
  monthYearLabelSize: "large",
  dayOfWeekLabelSize: "large",
  previousMonthIcon: IconChevronLeft,
  nextMonthIcon: IconChevronRight,
  monthYearSelectIcons: {
    open: IconChevronUp,
    close: IconChevronDown,
  },
  dayWidth: 40,
  dayHeight: 40,
  dayRadius: 16,
  daySize: "medium",
};
