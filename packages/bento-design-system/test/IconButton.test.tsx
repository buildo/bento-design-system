import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { IconX, unsafeLocalizedString, IconButton } from "../src";
import { act } from "react-dom/test-utils";
import { ignoreWarnings } from "./util/ignoreWarnings";

describe("IconButton", () => {
  test("onPress fires once", async () => {
    const onPress = vi.fn();
    render(
      <IconButton
        kind="solid"
        hierarchy="primary"
        size={8}
        onPress={onPress}
        icon={IconX}
        label={unsafeLocalizedString("Close")}
      />
    );
    const iconButton = await screen.findByRole("button");
    await ignoreWarnings(/onClick is deprecated, please use onPress/, () =>
      act(() => user.click(iconButton))
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
