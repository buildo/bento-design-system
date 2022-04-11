import {
  JSXElementConstructor,
  ComponentProps,
  FunctionComponent,
  useState,
  IframeHTMLAttributes,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import {
  AreaLoaderProps,
  AvatarProps,
  ActionsProps,
  BannerProps,
  BreadcrumbProps,
  ButtonProps,
  CardProps,
  CheckboxFieldProps,
  ChipProps,
  DisclosureGroupProps,
  FeedbackProps,
  ListProps,
  FormProps,
  FormRowProps,
  FormSectionProps,
  IconButtonProps,
  NavigationProps,
  ProgressBarProps,
  RadioGroupFieldProps,
  SearchBarProps,
  SelectFieldProps,
  StepperProps,
  TableProps,
  TabsProps,
} from ".";
import { IconIdea, IconCheck, IconSearch, IconUser, IconInformative } from "./Icons";
import { Box, Stack, Inline } from "./internal";
import { TextFieldProps } from "./TextField/createTextField";
import { Body } from "./Typography/Body/Body";
import { Title } from "./Typography/Title/Title";
import { unsafeLocalizedString } from "./util/LocalizedString";

const formatMessage = unsafeLocalizedString;

type ComponentShowcase<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P extends ComponentProps<C>
> = {
  title: string;
  Component: C;
  variants: P[][];
  variantLineDecorator?: (C: JSX.Element) => JSX.Element;
  iframe?: boolean;
};

export function IFrame({
  children,
  ...props
}: { children: JSX.Element } & IframeHTMLAttributes<HTMLIFrameElement>) {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  useLayoutEffect(() => {
    const nodes = [...document.head.querySelectorAll("*")].map((x) => x.cloneNode(true));
    contentRef?.contentWindow?.document?.head?.append(...nodes);
  }, [contentRef]);

  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe {...props} ref={setContentRef} style={{ border: "none" }}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
}

function componentShowcase<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P extends ComponentProps<C>
>({
  title,
  Component,
  variants,
  variantLineDecorator: decorator,
  iframe = false,
}: ComponentShowcase<C, P>): JSX.Element {
  const content = (
    <Box background="backgroundSecondary" padding={24} borderRadius={4}>
      <Stack space={16}>
        {variants.map((variantLine, index) => {
          const line = (
            <>
              {variantLine.map((variant) => (
                <Component {...variant} />
              ))}
            </>
          );
          return (
            <Inline space={16} key={index}>
              {decorator ? decorator(line) : line}
            </Inline>
          );
        })}
      </Stack>
    </Box>
  );

  return (
    <Stack space={24}>
      <Title size="large">{formatMessage(title)}</Title>
      {iframe ? <IFrame height={400}>{content}</IFrame> : content}
    </Stack>
  );
}

export const createUseComponentsShowcase =
  ({
    AreaLoader,
    Avatar,
    Actions,
    Banner,
    Breadcrumb,
    Button,
    Card,
    CheckboxField,
    Chip,
    DisclosureGroup,
    Feedback,
    Form,
    FormSection,
    FormRow,
    IconButton,
    List,
    Navigation,
    ProgressBar,
    RadioGroupField,
    SearchBar,
    SelectField,
    Stepper,
    Tabs,
    TextField,
  }: {
    AreaLoader?: FunctionComponent<AreaLoaderProps>;
    Avatar?: FunctionComponent<AvatarProps>;
    Actions?: FunctionComponent<ActionsProps>;
    Banner?: FunctionComponent<BannerProps>;
    Breadcrumb?: FunctionComponent<BreadcrumbProps>;
    Button?: FunctionComponent<ButtonProps>;
    Card?: FunctionComponent<CardProps<24 | 32 | 40>>;
    CheckboxField?: FunctionComponent<CheckboxFieldProps>;
    Chip?: FunctionComponent<ChipProps<string>>;
    DisclosureGroup?: FunctionComponent<DisclosureGroupProps>;
    Feedback?: FunctionComponent<FeedbackProps>;
    Form?: FunctionComponent<FormProps>;
    FormSection?: FunctionComponent<FormSectionProps>;
    FormRow?: FunctionComponent<FormRowProps>;
    IconButton?: FunctionComponent<IconButtonProps>;
    List?: FunctionComponent<ListProps>;
    Navigation?: FunctionComponent<NavigationProps<"none" | "icon" | "illustration">>;
    ProgressBar?: FunctionComponent<ProgressBarProps>;
    RadioGroupField?: FunctionComponent<RadioGroupFieldProps<string>>;
    SearchBar?: FunctionComponent<SearchBarProps>;
    SelectField?: FunctionComponent<SelectFieldProps<string, false>>;
    Stepper?: FunctionComponent<StepperProps>;
    // TODO(gabro): fix this any?
    Table?: FunctionComponent<TableProps<ReadonlyArray<any>>>;
    Tabs?: FunctionComponent<TabsProps<string>>;
    TextField?: FunctionComponent<TextFieldProps>;
  }) =>
  ({ action }: { action: (s: string) => () => void }) => {
    const buttonSharedProps = {
      label: formatMessage("Button"),
      onPress: action("onPress"),
    } as const;

    const iconButtonSharedProps = {
      label: formatMessage("Icon Button"),
      onPress: action("onPress"),
      icon: IconIdea,
      size: 16,
    } as const;

    const bannerSharedProps = {
      title: formatMessage("Title"),
      description: formatMessage("A description of what's going on"),
      action: {
        label: formatMessage("Action"),
        onPress: action("onPress"),
      },
      dismissButtonLabel: formatMessage("Dismiss"),
      onDismiss: action("onDismiss"),
    } as const;

    const feedbackSharedProps = {
      title: formatMessage("Title"),
      status: "positive",
      description: formatMessage("Description"),
      action: { label: formatMessage("Action"), onPress: action("onPress") },
    } as const;

    const [formState, setFormState] = useState({
      firstName: "",
      lastName: "",
      status: undefined as "open" | "closed" | "pending" | undefined,
      gender: undefined as "male" | "female" | "other" | undefined,
      termsAndConditions: false,
    });

    const [searchBarValue, searchBarOnChange] = useState("");
    const [tabValue, tabOnChange] = useState("tab1");

    return (
      <Stack space={24} dividers>
        {[
          AreaLoader &&
            componentShowcase({
              title: "AreaLoader",
              Component: AreaLoader,
              variants: [[{ message: formatMessage("Loading...") }]],
              iframe: true,
            }),
          Avatar &&
            componentShowcase({
              title: "Avatar",
              Component: Avatar,
              variants: [[{ name: "Cellply", color: "blue" }, { color: "green" }]],
            }),
          Actions &&
            componentShowcase({
              title: "Actions",
              Component: Actions,
              variants: [
                [
                  {
                    primaryAction: { label: formatMessage("Primary"), onPress: action("onPress") },
                    secondaryAction: {
                      label: formatMessage("Secondary"),
                      onPress: action("onPress"),
                    },
                  },
                ],
              ],
            }),
          Banner &&
            componentShowcase({
              title: "Banner",
              Component: Banner,
              variants: [
                [
                  { ...bannerSharedProps, kind: "informative" },
                  { ...bannerSharedProps, kind: "negative" },
                  { ...bannerSharedProps, kind: "warning" },
                  { ...bannerSharedProps, kind: "secondary" },
                ],
              ],
            }),
          Breadcrumb &&
            componentShowcase({
              title: "Breadcrumb",
              Component: Breadcrumb,
              variants: [
                [
                  {
                    items: [
                      { label: formatMessage("Root"), href: "" },
                      { label: formatMessage("1st level"), href: "" },
                      { label: formatMessage("2nd level"), href: "" },
                      { label: formatMessage("3rd level"), href: "" },
                      { label: formatMessage("Current page") },
                    ],
                  },
                ],
              ],
            }),
          Button &&
            componentShowcase({
              title: "Button",
              Component: Button,
              variants: [
                [
                  { ...buttonSharedProps, kind: "solid", hierarchy: "primary" },
                  { ...buttonSharedProps, kind: "solid", hierarchy: "secondary" },
                  { ...buttonSharedProps, kind: "solid", hierarchy: "danger" },
                ],
                [
                  { ...buttonSharedProps, kind: "outline", hierarchy: "primary" },
                  { ...buttonSharedProps, kind: "outline", hierarchy: "secondary" },
                  { ...buttonSharedProps, kind: "outline", hierarchy: "danger" },
                ],
                [
                  { ...buttonSharedProps, kind: "transparent", hierarchy: "primary" },
                  { ...buttonSharedProps, kind: "transparent", hierarchy: "secondary" },
                  { ...buttonSharedProps, kind: "transparent", hierarchy: "danger" },
                ],
              ],
            }),
          Card &&
            componentShowcase({
              title: "Card",
              Component: Card,
              variants: [
                [
                  {
                    elevation: "medium",
                    padding: 24,
                    children: (
                      <Stack space={8}>
                        <Title size="medium">{formatMessage("Experiment name")}</Title>
                        <Body size="large">{formatMessage("Experiment description")}</Body>
                      </Stack>
                    ),
                  },
                ],
              ],
            }),
          Chip &&
            componentShowcase({
              title: "Chip",
              Component: Chip,
              variants: [
                [
                  { color: "green", label: formatMessage("Chip") },
                  { color: "green", label: formatMessage("Chip"), icon: IconCheck },
                  {
                    color: "green",
                    label: formatMessage("Chip"),
                    icon: IconCheck,
                    onDismiss: action("onDismiss"),
                  },
                ],
              ],
            }),
          DisclosureGroup &&
            componentShowcase({
              title: "DisclosureGroup",
              Component: DisclosureGroup,
              variants: [
                [
                  {
                    items: [
                      {
                        title: formatMessage("Section 1"),
                        initialIsOpen: true,
                        children: (
                          <Body size="large">{formatMessage("Content of the first section")}</Body>
                        ),
                      },
                      {
                        title: formatMessage("Section 2"),
                        children: (
                          <Body size="large">{formatMessage("Content of the second section")}</Body>
                        ),
                      },
                      {
                        title: formatMessage("Section 3"),
                        initialIsOpen: true,
                        items: [
                          {
                            title: formatMessage("Subsection 3.1"),
                            children: (
                              <Body size="large">
                                {formatMessage("Content of the first subsection")}
                              </Body>
                            ),
                            initialIsOpen: true,
                          },
                          {
                            title: formatMessage("Subsection 3.2"),
                            children: (
                              <Body size="large">
                                {formatMessage("Content of the second subsection")}
                              </Body>
                            ),
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            }),
          Feedback &&
            componentShowcase({
              title: "Feedback",
              Component: Feedback,
              variants: [
                [
                  { ...feedbackSharedProps, size: "large" },
                  { ...feedbackSharedProps, size: "medium" },
                ],
              ],
            }),
          Form &&
            FormSection &&
            FormRow &&
            componentShowcase({
              title: "Form",
              Component: Form,
              variants: [
                [
                  {
                    title: formatMessage("Form title"),
                    description: formatMessage("Form description"),
                    submitButton: { label: formatMessage("Submit"), onPress: action("Submit") },
                    secondaryButton: { label: formatMessage("Cancel"), onPress: action("Cancel") },
                    children: (
                      <>
                        <FormSection
                          title={formatMessage("Section title")}
                          description={formatMessage("Section description")}
                        >
                          {TextField && (
                            <FormRow>
                              <TextField
                                name="firstName"
                                onBlur={action("onBlur")}
                                value={formState.firstName}
                                onChange={(firstName) => setFormState((s) => ({ ...s, firstName }))}
                                label={formatMessage("First Name")}
                                placeholder={formatMessage("Insert the first name")}
                              />
                              <TextField
                                name="lastName"
                                onBlur={action("onBlur")}
                                value={formState.lastName}
                                onChange={(lastName) => setFormState((s) => ({ ...s, lastName }))}
                                label={formatMessage("Last Name")}
                                placeholder={formatMessage("Insert the last name")}
                              />
                            </FormRow>
                          )}
                          {SelectField && (
                            <FormRow>
                              <SelectField
                                name="status"
                                onBlur={action("onBlur")}
                                value={formState.status}
                                onChange={(status: "open" | "closed" | "pending" | undefined) =>
                                  setFormState((s) => ({ ...s, status }))
                                }
                                menuSize="large"
                                label={formatMessage("Status")}
                                placeholder={formatMessage("Choose an option")}
                                options={[
                                  { label: formatMessage("Open"), value: "open" },
                                  { label: formatMessage("Closed"), value: "closed" },
                                  { label: formatMessage("Pending"), value: "pending" },
                                ]}
                              />
                            </FormRow>
                          )}
                          {RadioGroupField && (
                            <FormRow>
                              <RadioGroupField
                                name="gender"
                                onBlur={action("onBlur")}
                                value={formState.gender}
                                onChange={(gender: "male" | "female" | "other") =>
                                  setFormState((s) => ({ ...s, gender }))
                                }
                                label={formatMessage("Gender")}
                                options={[
                                  { label: formatMessage("Male"), value: "male" },
                                  { label: formatMessage("Female"), value: "female" },
                                  { label: formatMessage("Other"), value: "other" },
                                ]}
                              />
                            </FormRow>
                          )}
                          {CheckboxField && (
                            <FormRow>
                              <CheckboxField
                                name="termsAndConditions"
                                onBlur={action("onBlur")}
                                value={formState.termsAndConditions}
                                onChange={(termsAndConditions: boolean) =>
                                  setFormState((s) => ({ ...s, termsAndConditions }))
                                }
                                label={formatMessage("I have read the terms and conditions")}
                              />
                            </FormRow>
                          )}
                        </FormSection>
                      </>
                    ),
                  },
                ],
              ],
            }),
          IconButton &&
            componentShowcase({
              title: "IconButton",
              Component: IconButton,
              variants: [
                [
                  { ...iconButtonSharedProps, kind: "solid", hierarchy: "primary" },
                  { ...iconButtonSharedProps, kind: "solid", hierarchy: "secondary" },
                  { ...iconButtonSharedProps, kind: "solid", hierarchy: "danger" },
                ],
                [
                  { ...iconButtonSharedProps, kind: "transparent", hierarchy: "primary" },
                  { ...iconButtonSharedProps, kind: "transparent", hierarchy: "secondary" },
                  { ...iconButtonSharedProps, kind: "transparent", hierarchy: "danger" },
                ],
              ],
            }),
          List &&
            componentShowcase({
              title: "List",
              Component: List,
              variants: [
                [
                  {
                    size: "large",
                    items: [
                      {
                        kind: "single-line",
                        label: formatMessage("Item 1 - Single line"),
                        icon: IconIdea,
                        trailingIcon: IconCheck,
                      },
                      {
                        kind: "two-line",
                        label: formatMessage("Item 2 - Two lines"),
                        secondLine: formatMessage("Second line"),
                        trailingIcon: IconCheck,
                      },
                      {
                        kind: "overline",
                        label: formatMessage("Item 3 - Overline"),
                        overline: formatMessage("Overline"),
                        icon: IconIdea,
                      },
                    ],
                  },
                ],
              ],
            }),
          Navigation &&
            componentShowcase({
              title: "Navigation",
              Component: Navigation,
              variants: [
                [
                  {
                    kind: "none",
                    size: "medium",
                    destinations: [
                      { href: "", label: formatMessage("Home"), active: true },
                      { href: "", label: formatMessage("Experiments") },
                      { href: "", label: formatMessage("Users") },
                      { href: "", label: formatMessage("Profile") },
                    ],
                  },
                ],
                [
                  {
                    kind: "icon",
                    size: "large",
                    destinations: [
                      { href: "", label: formatMessage("Home"), active: true, icon: IconIdea },
                      { href: "", label: formatMessage("Experiments"), icon: IconSearch },
                      { href: "", label: formatMessage("Users"), icon: IconUser },
                      { href: "", label: formatMessage("Profile"), icon: IconInformative },
                    ],
                  },
                ],
              ],
            }),
          ProgressBar &&
            componentShowcase({
              title: "ProgressBar",
              Component: ProgressBar,
              variants: [
                [{ kind: "continuous", value: 10, maxValue: 10 }],
                [{ kind: "discrete", value: 3, maxValue: 5 }],
              ],
              variantLineDecorator: (C) => <Box width="full">{C}</Box>,
            }),
          SearchBar &&
            componentShowcase({
              title: "SearchBar",
              Component: SearchBar,
              variants: [
                [
                  {
                    placeholder: formatMessage("Search anything..."),
                    value: searchBarValue,
                    onChange: searchBarOnChange,
                  },
                ],
              ],
            }),
          Stepper &&
            componentShowcase({
              title: "Stepper",
              Component: Stepper,
              variants: [
                [
                  {
                    currentStep: 2,
                    steps: [
                      { label: formatMessage("Step 1") },
                      { label: formatMessage("Step 2") },
                      { label: formatMessage("Step 3") },
                      { label: formatMessage("Step 4") },
                      { label: formatMessage("Step 5") },
                    ],
                  },
                ],
              ],
            }),
          //TODO(gabro)
          // Table &&
          //   componentShowcase({
          //     title: 'Table',
          //     Component: Table,
          //     variants: [
          //       [
          //         {
          //           columns: [
          //             tableColumns.text({
          //               headerLabel: formatMessage("Name"),
          //               accessor: "name",
          //               sticky: "left",
          //             }),
          //             tableColumns.number({
          //               headerLabel: formatMessage("Experiments"),
          //               accessor: "experiments",
          //               valueFormatter: (value) => formatMessage(`${value}/100`),
          //               align: "right",
          //             }),
          //             tableColumns.chip({
          //               headerLabel: formatMessage("Status"),
          //               accessor: "status",
          //               align: "center",
          //             }),
          //           ],
          //           data: [
          //             {
          //               name: "John Doe",
          //               experiments: 100,
          //               status: { label: formatMessage("done"), color: "green" },
          //             },
          //             {
          //               name: "Jane Doe",
          //               experiments: 20,
          //               status: { label: formatMessage("running"), color: "blue" },
          //             },
          //             {
          //               name: "Jane Doe",
          //               experiments: 0,
          //               status: { label: formatMessage("pending"), color: "yellow" },
          //             },
          //           ],
          //         },
          //       ],
          //     ],
          //   }),
          Tabs &&
            componentShowcase({
              title: "Tabs",
              Component: Tabs,
              variants: [
                [
                  {
                    value: tabValue,
                    onChange: tabOnChange as any,
                    size: "medium",
                    tabs: [
                      { label: formatMessage("Tab 1"), value: "tab1" },
                      { label: formatMessage("Tab 2"), value: "tab2" },
                      { label: formatMessage("Tab 3"), value: "tab3" },
                      { label: formatMessage("Tab 4"), value: "tab4" },
                    ],
                  },
                ],
              ],
            }),
        ].filter(Boolean)}
      </Stack>
    );
  };
