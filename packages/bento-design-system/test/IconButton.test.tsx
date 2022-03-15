import { IconButton } from "../src/IconButton/createIconButton";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import {
  createIconButton,
  defaultIconButtonConfig,
  IconClose,
  unsafeLocalizedString,
} from "../src";
import { act } from "react-dom/test-utils";
import { ignoreWarnings } from "./util/ignoreWarnings";

const IconButton = createIconButton(defaultIconButtonConfig);

describe("IconButton", () => {
  test("onPress fires once", async () => {
    const onPress = jest.fn();
    render(
      <IconButton
        kind="solid"
        hierarchy="primary"
        size={8}
        onPress={onPress}
        icon={IconClose}
        label={unsafeLocalizedString("Close")}
      />
    );
    const iconButton = await screen.findByRole("button");
    ignoreWarnings(/onClick is deprecated, please use onPress/, () =>
      act(() => user.click(iconButton))
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
