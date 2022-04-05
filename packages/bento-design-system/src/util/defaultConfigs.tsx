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
} from "../Icons";
import { ButtonConfig } from "../Button/Config";
import { CardConfig } from "../Card/Config";
import { ChipConfig } from "../Chip/Config";
import { bentoSprinkles, Box } from "../internal";
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
import { LinkConfig } from "../Link/Config";
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

export const actions: ActionsConfig = {
  buttonsAlignment: "right",
  primaryPosition: "right",
  spaceBetweenButtons: 16,
  defaultSize: "medium",
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
};

export const banner: BannerConfig = {
  padding: 16,
  titleSize: "small",
  descriptionSize: "small",
  radius: 8,
  closeIcon: IconClose,
  kindIcons: {
    informative: IconInformative,
    positive: IconPositive,
    warning: IconWarning,
    negative: IconNegative,
    secondary: IconIdea,
  },
};

export const breadcrumb: BreadcrumbConfig = {
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
  radius: 8,
};

export const chip: ChipConfig<typeof bentoSprinkles, string> = {
  paddingX: 8,
  paddingY: 4,
  labelSize: "small",
  iconSize: 12,
  closeIcon: IconClose,
  closeIconSize: 8,
  spacingAfterIcon: 4,
  spacingAfterLabel: 8,
  customColors: {},
};

export const disclosure: DisclosureConfig = {
  internalSpacing: 16,
  titleSize: {
    1: "medium",
    2: "small",
  },
};

export const disclosureGroup: DisclosureGroupConfig = {
  groupSpacing: 40,
  disclosureSpacing: 24,
  dividers: true,
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
};

export const field: FieldConfig = {
  label: { size: "small" },
  assistiveText: {
    size: "small",
    paddingLeft: 16,
  },
  internalSpacing: 4,
};

export const input: InputConfig = {
  radius: 4,
  paddingX: 16,
  paddingY: 16,
  fontSize: "large",
};

export const selectionControl: {
  group: SelectionControlGroupConfig;
  element: SelectionControlConfig;
} = {
  group: {
    paddingY: 8,
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
    headerTitleSize: "small",
    headerDescriptionSize: "medium",
    formSpacing: 40,
    headerSpacing: 16,
    actionsSize: "large",
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

export const link: LinkConfig = {
  labelSize: "large",
  labelDecoration: {
    default: "none",
    active: "none",
    hover: "underline",
    focus: "underline",
    disabled: "none",
  },
};

export const list: ListConfig = {
  item: {
    paddingX: 16,
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
  headerPaddingX: 24,
  headerPaddingY: 24,
  defaultOffset: 4,
};

export const modal: ModalConfig = {
  padding: 24,
  radius: 8,
  titleSize: "large",
  closeIcon: IconClose,
  closeIconSize: 16,
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
  searchIcon: IconSearch,
};

export const dropdown: DropdownConfig = {
  elevation: "medium",
  radius: 8,
  menuPaddingY: 8,
  list: {
    item: {
      paddingX: 16,
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
  thumbRadius: 8,
};

export const stepper: StepperConfig = {
  spaceBetweenSteps: 40,
  internalSpacing: 8,
  labelSize: "large",
  numberSize: "large",
  labelUppercase: false,
  doneIcon: IconPositive,
};
