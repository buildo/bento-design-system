import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import {
  BentoProvider,
  PartialBentoConfig,
  SelectField,
  SelectOption,
  unsafeLocalizedString,
} from "../src";
import { defaultMessages } from "../src/defaultMessages/en";

type MultiSelectSearchMode = "clear-on-select" | "preserve-on-select";

const options: Array<SelectOption<string>> = [
  { value: "red", label: unsafeLocalizedString("Red") },
  { value: "green", label: unsafeLocalizedString("Green") },
  { value: "blue", label: unsafeLocalizedString("Blue") },
];

function MultiSelect({ multiSelectSearchMode }: { multiSelectSearchMode?: MultiSelectSearchMode }) {
  const [value, setValue] = useState<string[]>([]);

  return (
    <SelectField
      isMulti
      label={unsafeLocalizedString("Colors")}
      options={options}
      value={value}
      onChange={setValue}
      multiSelectSearchMode={multiSelectSearchMode}
    />
  );
}

function renderWithConfig(
  component: React.ReactNode,
  multiSelectSearchMode?: MultiSelectSearchMode
) {
  const config: PartialBentoConfig | undefined = multiSelectSearchMode
    ? { dropdown: { multiSelectSearchMode } }
    : undefined;

  return render(
    <BentoProvider defaultMessages={defaultMessages} config={config}>
      {component}
    </BentoProvider>
  );
}

describe("SelectField multi-select search mode", () => {
  test.each<{
    name: string;
    configuredMode?: MultiSelectSearchMode;
    propMode?: MultiSelectSearchMode;
    expectedQuery: string;
  }>([
    {
      name: "clears by default",
      expectedQuery: "",
    },
    {
      name: "can preserve through the component prop",
      propMode: "preserve-on-select",
      expectedQuery: "re",
    },
    {
      name: "can preserve through the provider config",
      configuredMode: "preserve-on-select",
      expectedQuery: "re",
    },
    {
      name: "lets the component prop override the provider config",
      configuredMode: "preserve-on-select",
      propMode: "clear-on-select",
      expectedQuery: "",
    },
  ])("$name", async ({ configuredMode, propMode, expectedQuery }) => {
    const user = userEvent.setup();
    renderWithConfig(<MultiSelect multiSelectSearchMode={propMode} />, configuredMode);

    const input = screen.getByRole("combobox", { name: "Colors" });
    await user.type(input, "re");
    await user.click(screen.getByText("Red"));

    expect(input).toHaveValue(expectedQuery);
  });

  test("keeps the filtered menu focused for consecutive pointer selections", async () => {
    const user = userEvent.setup();
    renderWithConfig(<MultiSelect multiSelectSearchMode="preserve-on-select" />);

    const input = screen.getByRole("combobox", { name: "Colors" });
    await user.type(input, "re");
    await user.click(screen.getByText("Red"));

    expect(input).toHaveValue("re");
    expect(input).toHaveFocus();
    expect(screen.getByRole("list")).toBeVisible();
    expect(screen.queryByText("Blue")).not.toBeInTheDocument();

    await user.click(screen.getByText("Green"));

    expect(input).toHaveValue("re");
    expect(screen.getByText("2 options selected")).toBeVisible();
  });

  test("keeps the query during consecutive keyboard selections", async () => {
    const user = userEvent.setup();
    renderWithConfig(<MultiSelect multiSelectSearchMode="preserve-on-select" />);

    const input = screen.getByRole("combobox", { name: "Colors" });
    await user.type(input, "re");
    await user.keyboard("{Enter}");

    expect(input).toHaveValue("re");

    await user.keyboard("{ArrowDown}{Enter}");

    expect(input).toHaveValue("re");
    expect(screen.getByText("2 options selected")).toBeVisible();
  });

  test("allows editing and explicitly clearing a preserved query", async () => {
    const user = userEvent.setup();
    renderWithConfig(<MultiSelect multiSelectSearchMode="preserve-on-select" />);

    const input = screen.getByRole("combobox", { name: "Colors" });
    await user.type(input, "re");
    await user.click(screen.getByText("Red"));
    await user.keyboard("{Backspace}");
    expect(input).toHaveValue("r");

    await user.clear(input);
    expect(input).toHaveValue("");
  });

  test("clears the query on Escape, blur, and remount", async () => {
    const user = userEvent.setup();
    const { unmount } = renderWithConfig(
      <>
        <MultiSelect multiSelectSearchMode="preserve-on-select" />
        <button>Outside</button>
      </>
    );

    const input = screen.getByRole("combobox", { name: "Colors" });
    await user.type(input, "re");
    await user.keyboard("{Escape}");
    expect(input).toHaveValue("");

    await user.type(input, "bl");
    await user.click(screen.getByRole("button", { name: "Outside" }));
    expect(input).toHaveValue("");

    unmount();
    renderWithConfig(<MultiSelect multiSelectSearchMode="preserve-on-select" />);
    expect(screen.getByRole("combobox", { name: "Colors" })).toHaveValue("");
  });
});
