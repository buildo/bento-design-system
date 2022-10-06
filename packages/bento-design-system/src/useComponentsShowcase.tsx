import {
  JSXElementConstructor,
  ComponentProps,
  useState,
  IframeHTMLAttributes,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import {
  Box,
  Inline,
  Stack,
  Actions,
  AreaLoader,
  Avatar,
  Banner,
  Breadcrumb,
  Button,
  Card,
  Chip,
  DisclosureGroup,
  Feedback,
  Form,
  FormRow,
  FormSection,
  IconButton,
  List,
  Navigation,
  ProgressBar,
  SearchBar,
  Stepper,
  Table,
  tableColumn,
  Tabs,
} from ".";
import { CheckboxField } from "./CheckboxField/CheckboxField";
import { IconIdea, IconCheck, IconSearch, IconUser, IconInformative } from "./Icons";
import { RadioGroupField } from "./RadioGroupField/RadioGroupField";
import { SelectField } from "./SelectField/SelectField";
import { TextField } from "./TextField/TextField";
import { Body } from "./Typography/Body/Body";
import { Title } from "./Typography/Title/Title";

type ComponentShowcase<
  C extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  P extends ComponentProps<C>
> = {
  title: string;
  Component: C;
  variants: P[][];
  variantLineDecorator?: (C: JSX.Element) => JSX.Element;
  iframe?: boolean;
  absolute?: boolean;
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
  absolute = false,
}: ComponentShowcase<C, P>): JSX.Element {
  const _content = (
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

  const content = absolute ? (
    <Box position="relative" style={{ height: 400 }}>
      {_content}
    </Box>
  ) : (
    _content
  );

  return (
    <Stack space={24}>
      <Title size="large">{title}</Title>
      {iframe ? <IFrame height={400}>{content}</IFrame> : content}
    </Stack>
  );
}

export function useComponentsShowcase({ action }: { action: (s: string) => () => void }) {
  const buttonSharedProps = {
    label: "Button",
    onPress: action("onPress"),
  } as const;

  const iconButtonSharedProps = {
    label: "Icon Button",
    onPress: action("onPress"),
    icon: IconIdea,
    size: 16,
  } as const;

  const bannerSharedProps = {
    title: "Title",
    description: "A description of what's going on",
    action: {
      label: "Action",
      onPress: action("onPress"),
    },
    dismissButtonLabel: "Dismiss",
    onDismiss: action("onDismiss"),
  } as const;

  const feedbackSharedProps = {
    title: "Title",
    status: "positive",
    description: "Description",
    action: { label: "Action", onPress: action("onPress") },
  } as const;

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    status: undefined as string | undefined,
    gender: undefined as string | undefined,
    termsAndConditions: false,
  });

  const [searchBarValue, searchBarOnChange] = useState("");
  const [tabValue, tabOnChange] = useState("tab1");

  return (
    <Stack space={24} dividers>
      {[
        componentShowcase({
          title: "AreaLoader",
          Component: AreaLoader,
          variants: [[{ message: "Loading..." }]],
          absolute: true,
        }),
        componentShowcase({
          title: "Avatar",
          Component: Avatar,
          variants: [[{ name: "Cellply", color: "blue" }, { color: "green" }]],
        }),
        componentShowcase({
          title: "Actions",
          Component: Actions,
          variants: [
            [
              {
                primaryAction: { label: "Primary", onPress: action("onPress") },
                secondaryAction: {
                  label: "Secondary",
                  onPress: action("onPress"),
                },
              },
            ],
          ],
        }),
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
        componentShowcase({
          title: "Breadcrumb",
          Component: Breadcrumb,
          variants: [
            [
              {
                items: [
                  { label: "Root", href: "" },
                  { label: "1st level", href: "" },
                  { label: "2nd level", href: "" },
                  { label: "3rd level", href: "" },
                  { label: "Current page" },
                ],
              },
            ],
          ],
        }),
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
                    <Title size="medium">Experiment name</Title>
                    <Body size="large">Experiment description</Body>
                  </Stack>
                ),
              },
            ],
          ],
        }),
        componentShowcase({
          title: "Chip",
          Component: Chip,
          variants: [
            [
              { color: "green", label: "Chip" },
              { color: "green", label: "Chip", icon: IconCheck },
              {
                color: "green",
                label: "Chip",
                icon: IconCheck,
                onDismiss: action("onDismiss"),
              },
            ],
          ],
        }),
        componentShowcase({
          title: "DisclosureGroup",
          Component: DisclosureGroup,
          variants: [
            [
              {
                items: [
                  {
                    title: "Section 1",
                    initialIsOpen: true,
                    children: <Body size="large">Content of the first section</Body>,
                  },
                  {
                    title: "Section 2",
                    children: <Body size="large">Content of the second section</Body>,
                  },
                  {
                    title: "Section 3",
                    initialIsOpen: true,
                    items: [
                      {
                        title: "Subsection 3.1",
                        children: <Body size="large">Content of the first subsection</Body>,
                        initialIsOpen: true,
                      },
                      {
                        title: "Subsection 3.2",
                        children: <Body size="large">Content of the second subsection</Body>,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        }),
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
        componentShowcase({
          title: "Form",
          Component: Form,
          variants: [
            [
              {
                title: "Form title",
                description: "Form description",
                submitButton: { label: "Submit", onPress: action("Submit") },
                secondaryButton: { label: "Cancel", onPress: action("Cancel") },
                children: (
                  <>
                    <FormSection title="Section title" description="Section description">
                      <FormRow>
                        <TextField
                          name="firstName"
                          onBlur={action("onBlur")}
                          value={formState.firstName}
                          onChange={(firstName) => setFormState((s) => ({ ...s, firstName }))}
                          label="First Name"
                          placeholder="Insert the first name"
                        />
                        <TextField
                          name="lastName"
                          onBlur={action("onBlur")}
                          value={formState.lastName}
                          onChange={(lastName) => setFormState((s) => ({ ...s, lastName }))}
                          label="Last Name"
                          placeholder="Insert the last name"
                        />
                      </FormRow>
                      <FormRow>
                        <SelectField
                          name="status"
                          onBlur={action("onBlur")}
                          value={formState.status}
                          onChange={(status: string | undefined) =>
                            setFormState((s) => ({ ...s, status }))
                          }
                          label="Status"
                          placeholder="Choose an option"
                          options={[
                            { label: "Open", value: "open" },
                            { label: "Closed", value: "closed" },
                            { label: "Pending", value: "pending" },
                          ]}
                        />
                      </FormRow>
                      <FormRow>
                        <RadioGroupField
                          name="gender"
                          onBlur={action("onBlur")}
                          value={formState.gender}
                          onChange={(gender) => setFormState((s) => ({ ...s, gender }))}
                          label="Gender"
                          options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                            { label: "Other", value: "other" },
                          ]}
                        />
                      </FormRow>
                      <FormRow>
                        <CheckboxField
                          name="termsAndConditions"
                          onBlur={action("onBlur")}
                          value={formState.termsAndConditions}
                          onChange={(termsAndConditions: boolean) =>
                            setFormState((s) => ({ ...s, termsAndConditions }))
                          }
                          label="I have read the terms and conditions"
                        />
                      </FormRow>
                    </FormSection>
                  </>
                ),
              },
            ],
          ],
        }),
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
                    label: "Item 1 - Single line",
                    icon: IconIdea,
                    trailingIcon: IconCheck,
                  },
                  {
                    kind: "two-line",
                    label: "Item 2 - Two lines",
                    secondLine: "Second line",
                    trailingIcon: IconCheck,
                  },
                  {
                    kind: "overline",
                    label: "Item 3 - Overline",
                    overline: "Overline",
                    icon: IconIdea,
                  },
                ],
              },
            ],
          ],
        }),
        componentShowcase({
          title: "Navigation",
          Component: Navigation,
          variants: [
            [
              {
                kind: "none",
                size: "medium",
                destinations: [
                  { href: "", label: "Home", active: true },
                  { href: "", label: "Experiments" },
                  { href: "", label: "Users" },
                  { href: "", label: "Profile" },
                ],
              },
            ],
            [
              {
                kind: "icon",
                size: "large",
                destinations: [
                  { href: "", label: "Home", active: true, icon: IconIdea },
                  { href: "", label: "Experiments", icon: IconSearch },
                  { href: "", label: "Users", icon: IconUser },
                  { href: "", label: "Profile", icon: IconInformative },
                ],
              },
            ],
          ],
        }),
        componentShowcase({
          title: "ProgressBar",
          Component: ProgressBar,
          variants: [
            [{ kind: "continuous", value: 10, maxValue: 10 }],
            [{ kind: "discrete", value: 3, maxValue: 5 }],
          ],
          variantLineDecorator: (C) => <Box width="full">{C}</Box>,
        }),
        componentShowcase({
          title: "SearchBar",
          Component: SearchBar,
          variants: [
            [
              {
                placeholder: "Search anything...",
                value: searchBarValue,
                onChange: searchBarOnChange,
                "aria-label": "Search",
              },
            ],
          ],
        }),
        componentShowcase({
          title: "Stepper",
          Component: Stepper,
          variants: [
            [
              {
                currentStep: 2,
                steps: [
                  { label: "Step 1" },
                  { label: "Step 2" },
                  { label: "Step 3" },
                  { label: "Step 4" },
                  { label: "Step 5" },
                ],
              },
            ],
          ],
        }),
        tableColumn &&
          componentShowcase({
            title: "Table",
            Component: Table,
            variants: [
              [
                {
                  columns: [
                    tableColumn.text({
                      headerLabel: "Name",
                      accessor: "name",
                      sticky: "left",
                    }),
                    tableColumn.number({
                      headerLabel: "Experiments",
                      accessor: "experiments",
                      valueFormatter: (value) => `${value}/100`,
                      align: "right",
                    }),
                    tableColumn.chip({
                      headerLabel: "Status",
                      accessor: "status",
                      align: "center",
                    }),
                  ],
                  data: [
                    {
                      name: "John Doe",
                      experiments: 100,
                      status: { label: "done", color: "green" },
                    },
                    {
                      name: "Jane Doe",
                      experiments: 20,
                      status: { label: "running", color: "blue" },
                    },
                    {
                      name: "Jane Doe",
                      experiments: 0,
                      status: { label: "pending", color: "yellow" },
                    },
                  ],
                },
              ],
            ],
          }),
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
                  { label: "Tab 1", value: "tab1" },
                  { label: "Tab 2", value: "tab2" },
                  { label: "Tab 3", value: "tab3" },
                  { label: "Tab 4", value: "tab4" },
                ],
              },
            ],
          ],
        }),
      ].filter(Boolean)}
    </Stack>
  );
}
