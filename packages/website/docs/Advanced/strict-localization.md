---
title: Type-safe localization with LocalizedString
---
Many Bento components accept strings that get presented to the user (either visually or via aria attributes).

If you take a look at the source code, you'll notice these strings are typed as `LocalizedString`.

`LocalizedString` is a special type that defaults to `string`, but it can be customized to make it more useful.

Why would you want to customize it? One good reason is to avoid to accidentally render a non localized string. Let's see an example:

```tsx
function MyComponent() {
  return (
    <Button label="woops, not localized" onPress={() => {}} kind="solid" hierarchy="primary" />
  );
}
```

In the example above, we forgot to localize the Button's label.
By default Bento won't complain about it, since `LocalizedStrinng` is an alias for `string`.
Let's fix this!

```ts title="my-project/app/src/bento.d.ts
import "@buildo/bento-design-system";

declare module "@buildo/bento-design-system" {
  interface TypeOverrides {
    LocalizedString: string & { readonly LocalizedString: "LocalizedString" };
  }
}
```

Now `LocalizedString` isn't just any string: it's a string which must also have a special "tag" attached to it.

The only thing that's left is to have our localization function produce these special strings. Here's a dummy one that just casts the given key:

```ts title="my-project/app/src/utils/useFormatMessage.ts"
import { LocalizedString } from "@buildo/bento-design-system";

function useFormatMessage(): (key: string) => LocalizedString {
  return (key) => key as unknown as LocalizedString;
}
```

Let's test this:

```tsx
import { useFormatMessage } from "./utils/useFormatMessage";

function MyComponent() {
  const formatMessage = useFormatMessage();
  return (
    <>
      // type error!
      <Button label="woops, not localized" onPress={() => {}} kind="solid" hierarchy="primary" />
      // ok!
      <Button
        label={formatMessage("MyComponent.buttonLabel")}
        onPress={() => {}}
        kind="solid"
        hierarchy="primary"
      />
    </>
  );
}
```

Great! Now all Bento components will complain if we accidentally forget to localized a string that must be presented to the user 🎉

In a real application, you will probably use a library like `react-intl` or `react-i18next`, so you will need to wrap their localization function such that it returns `LocalizedString` instead of `string`. Here's a couple of examples of how you could achieve it:

<details>
  <summary><code>react-intl</code> + <code>LocalizedString</code></summary>

```ts title="my-project/app/src/utils/useFormatMessage.ts"
import { useIntl } from "react-intl";
import { PrimitiveType } from "intl-messageformat";
import { LocalizedString } from "@buildo/bento-react-components";

export function useFormatMessage(): (
  id: string,
  values?: Record<string, PrimitiveType>
) => LocalizedString {
  const intl = useIntl();

  return (id, values) => {
    return intl.formatMessage({ id }, values) as unknown as LocalizedString;
  };
}
```

</details>

<details>
  <summary><code>react-i18next</code> + <code>LocalizedString</code></summary>

```ts title="my-project/app/src/utils/useTranslation.ts"
import { StringMap, TOptions } from "i18next";
import { useTranslation as nativeUseTranslation } from "react-i18next";
import { LocalizedString } from "@buildo/bento-react-components";

export const useTranslation = () => {
  const { t, i18n } = nativeUseTranslation();

  type i18nextParameters = Parameters<typeof t>;

  interface TFunction {
    (key: i18nextParameters[0], options?: TOptions<StringMap> | string): LocalizedString;
    (
      key: i18nextParameters[0],
      defaultValue?: LocalizedString,
      options?: TOptions<StringMap> | string
    ): LocalizedString;
  }

  const translate: TFunction = (...args) => t(...(args as [any]));

  return {
    t: translate,
    i18n,
  };
};
```

</details>
