import { ActionsConfig } from "../Actions/Config";
import { AreaLoaderConfig } from "../AreaLoader/Config";
import { AvatarConfig } from "../Avatar/Config";
import { BannerConfig } from "../Banner/Config";
import { BreadcrumbConfig } from "../Breadcrumb/Config";
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
} from "../Icons";
import { ButtonConfig } from "../Button/Config";
import { CardConfig } from "../Card/Config";
import { ChipConfig } from "../Chip/Config";
import { DisclosureConfig } from "../Disclosure/Config";
import { DisclosureGroupConfig } from "../DisclosureGroup/Config";
import { IllustrationNegative, IllustrationPositive, IllustrationSearch } from "../Illustrations";
import { FeedbackConfig } from "../Feedback/Config";
import {
  FieldConfig,
  InputConfig,
  SelectionControlConfig,
  SelectionControlGroupConfig,
} from "../Field/Config";
import { FormLayoutConfig } from "../Form/Config";
import { IconButtonConfig } from "../IconButton/Config";
import { ListConfig } from "../List/Config";
import { MenuConfig } from "../Menu/Config";
import { ModalConfig } from "../Modal/Config";
import { NavigationConfig } from "../Navigation/Config";
import { SearchBarConfig } from "../SearchBar/Config";
import { DropdownConfig } from "../SelectField/Config";
import { TableConfig } from "../Table/Config";
import { TabsConfig } from "../Tabs/Config";
import { ToastConfig } from "../Toast/Config";
import { ProgressBarConfig } from "../ProgressBar/Config";
import { StepperConfig } from "../Stepper/Config";
import { SliderConfig } from "../Slider/Config";
import { TooltipConfig } from "../Tooltip/Config";
import { InlineLoaderConfig } from "../InlineLoader/Config";
import { DecorativeDividerConfig } from "../Divider/Config";
import { DateFieldConfig } from "../DateField/Config";
import { Box } from "../Box/Box";

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
  scrimColor: "light",
  messageColor: "primary",
  messageSize: "medium",
  readabilityAreaColor: "primary",
  readabilityAreaBorderRadius: undefined,
};

export const avatar: AvatarConfig = {
  width: 40,
  height: 40,
  radius: "circled",
  labelSize: "large",
  icon: IconUser,
  iconSize: 16,
  outline: "none",
};

export const banner: BannerConfig = {
  paddingX: 16,
  paddingY: 16,
  titleSize: "small",
  descriptionSize: "small",
  radius: 8,
  closeIcon: IconClose,
  closeIconSize: 12,
  semanticIcons: {
    informative: IconInformative,
    positive: IconPositive,
    warning: IconWarning,
    negative: IconNegative,
    secondary: IconIdea,
  },
  semanticIconSize: {
    withoutTitle: 16,
    withTitle: 24,
  },
  outline: false,
  buttonKind: "transparent",
  buttonSize: "small",
};

export const breadcrumb: BreadcrumbConfig = {
  fontSize: "medium",
  separator: IconChevronRight,
  separatorSize: 8,
  space: 16,
};

export const button: ButtonConfig = {
  paddingX: {
    small: 8,
    medium: 16,
    large: 16,
  },
  paddingY: {
    small: 4,
    medium: 8,
    large: 16,
  },
  labelSize: "large",
  radius: 4,
  internalSpacing: 8,
  iconSize: {
    small: 12,
    medium: 12,
    large: 16,
  },
  uppercaseLabel: true,
  defaultSize: "medium",
};

export const card: CardConfig = {
  defaultRadius: 8,
};

export const chip: ChipConfig = {
  paddingX: 8,
  paddingY: 4,
  labelSize: "small",
  iconSize: 12,
  closeIcon: IconClose,
  closeIconSize: 8,
  spacingAfterIcon: 4,
  spacingAfterLabel: 8,
  customColors: {},
  radius: "circledX",
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
    1: 16,
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
    medium: "large",
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
  },
};

export const inlineLoader: InlineLoaderConfig = {
  messageSize: "medium",
  spinnerIcon: IconSpinner,
  spinnerIconSize: 16,
};

export const input: InputConfig = {
  radius: 4,
  paddingX: 16,
  paddingY: 16,
  fontSize: "large",
  internalSpacing: 16,
  iconSize: 16,
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
    labelPaddingTop: 2,
    controlLabelSpacing: 8,
    labelSize: "large",
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
    defaultActionsSize: "large",
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
  radius: 4,
  padding: {
    8: 8,
    12: 8,
    16: 16,
    24: 16,
  },
};

export const list: ListConfig = {
  item: {
    paddingX: {
      medium: 16,
      large: 16,
    },
    paddingY: {
      medium: 8,
      large: 16,
    },
    fontSize: {
      firstLine: "medium",
      secondLine: "small",
      overline: "small",
    },
    internalSpacing: 16,
    iconSize: {
      leading: 24,
      trailing: 16,
      illustration: 32,
    },
  },
};

export const menu: MenuConfig = {
  paddingY: 8,
  radius: 8,
  elevation: "medium",
  headerPaddingX: 16,
  headerPaddingY: 16,
  defaultOffset: 4,
  nestedMenuIcon: IconChevronRight,
};

export const modal: ModalConfig = {
  paddingX: 24,
  paddingY: 24,
  radius: 8,
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
};

export const navigation: NavigationConfig = {
  destinationPaddingX: {
    medium: 16,
    large: 24,
  },
  destinationPaddingY: {
    medium: 8,
    large: 16,
  },
  destinationsSpacing: 0,
  iconSize: {
    medium: 16,
    large: 16,
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
    medium: "large",
    large: "large",
  },
  activeVisualElement: (
    <Box
      position="absolute"
      left={0}
      bottom={0}
      background="brandPrimary"
      width="full"
      style={{ height: 2 }}
    />
  ),
  uppercaseLabel: false,
};

export const searchBar: SearchBarConfig = {
  ...input,
  clearIcon: IconClose,
  clearIconSize: 12,
  searchIcon: IconSearch,
  searchIconSize: 16,
};

export const dropdown: DropdownConfig = {
  elevation: "medium",
  radius: 8,
  menuPaddingY: 8,
  list: {
    item: {
      paddingX: {
        medium: 16,
        large: 16,
      },
      paddingY: {
        medium: 8,
        large: 16,
      },
      fontSize: {
        firstLine: "medium",
        secondLine: "small",
        overline: "small",
      },
      internalSpacing: 16,
      iconSize: {
        leading: 24,
        trailing: 16,
        illustration: 32,
      },
    },
  },
  defaultMenuSize: "medium",
};

export const table: TableConfig = {
  headerInfoIcon: IconInformative,
  emptyIllustration: IllustrationSearch,
};

export const toast: ToastConfig = {
  paddingX: 16,
  paddingY: 16,
  radius: 8,
  messageSize: "medium",
  closeIcon: IconClose,
  closeIconSize: 12,
  smallButtonPaddingY: button.paddingY.small,
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
    medium: 8,
    large: 16,
  },
  labelSize: {
    medium: "medium",
    large: "large",
  },
  uppercaseLabel: false,
  iconSize: 16,
  notificationSize: 6,
  notificationColor: "foregroundInteractive",
} as const;

export const folderTabs: TabsConfig = {
  ...tabsBaseConfig,
  kind: "folder",
  radius: 4,
  paddingX: {
    medium: 40,
    large: 40,
  },
  activeBackgroundColor: "backgroundInteractiveOverlay",
  activeForegroundColor: "textInteractive",
};

export const underlineTabs: TabsConfig = {
  ...tabsBaseConfig,
  kind: "underline",
  paddingX: {
    medium: 16,
    large: 32,
  },
  lineHeight: 2,
  lineColor: {
    default: "transparent",
    hover: "foregroundSecondaryInverse",
    focus: "foregroundSecondaryInverse",
    active: "brandPrimary",
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
  internalSpacing: 24,
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
  radius: 4,
  labelSize: "medium",
};

export const dateField: DateFieldConfig = {
  radius: 8,
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
  dayRadius: 4,
  daySize: "medium",
};
