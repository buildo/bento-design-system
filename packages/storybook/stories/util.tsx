import { Parameters } from "@storybook/addons";
import { ComponentStory } from "@storybook/react";
import { JSXElementConstructor, ComponentProps, useState } from "react";
import { unsafeLocalizedString, Omit, alignToFlexAlignLookup, alignYToFlexAlignLookup } from ".";
import { vars } from "@buildo/bento-design-system";

export type Actions<Props> = {
  [k in keyof Props]-?: k extends `on${infer _}` ? k : never;
}[keyof Props];

type ComponentMeta<C extends JSXElementConstructor<any>, D extends Partial<ComponentProps<C>>> = {
  component: C;
  args: D;
  argTypes?: Record<string, unknown>;
  decorators?: Array<(story: ComponentStory<C>, args: D) => ComponentStory<C>>;
  parameters?: Record<string, unknown>;
  subcomponents?: Record<string, JSXElementConstructor<any>>;
};

export function createComponentStories<
  C extends JSXElementConstructor<any>,
  D extends Partial<ComponentProps<C>>
>(
  meta: ComponentMeta<C, D>
): {
  defaultExport: ComponentMeta<C, D>;
  createStory: (
    args: Omit<ComponentProps<C>, keyof D | Actions<ComponentProps<C>>> &
      Partial<ComponentProps<C>>,
    parameters?: Parameters
  ) => ComponentStory<C>;
  createControlledStory: <S>(
    initialValue: S,
    args: Omit<ComponentProps<C>, keyof D | Actions<ComponentProps<C>> | "value"> &
      Partial<ComponentProps<C>>,
    parameters?: Parameters
  ) => ComponentStory<C>;
} {
  return {
    defaultExport: meta,
    createStory: (args: any, parameters: any): ComponentStory<C> => {
      const Component = meta.component as any;
      const Template = (args: any) => <Component {...args} />;
      const S = Template.bind({}) as any;
      S.parameters = parameters;
      S.args = args;
      return S;
    },
    createControlledStory: <S extends unknown>(
      initialValue: S,
      args: any,
      parameters: any
    ): ComponentStory<C> => {
      const Component = meta.component as any;
      const Template = (args: any) => {
        const [value, onChange] = useState(initialValue);
        return <Component {...args} value={value} onChange={onChange} />;
      };
      const S = Template.bind({}) as any;
      S.parameters = parameters;
      S.args = args;
      return S;
    },
  };
}

export const textArgType: any = { control: { type: "text" } };
export const disableControlArgType: any = { control: { disable: true } };
export const spaceArgType: any = {
  options: Object.keys(vars.space),
  control: {
    type: "select",
    mapping: vars.space,
  },
};
export const alignArgType: any = {
  options: Object.keys(alignToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignToFlexAlignLookup,
  },
};

export const alignYArgType: any = {
  options: Object.keys(alignYToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignYToFlexAlignLookup,
  },
};

export const issuesArgType: any = { control: { type: "array" } };

export const fieldArgTypes = {
  label: textArgType,
  assistiveText: textArgType,
  issues: issuesArgType,
  hint: textArgType,
};

export const formatMessage = unsafeLocalizedString;
