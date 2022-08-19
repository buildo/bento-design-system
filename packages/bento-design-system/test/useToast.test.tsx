import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import user from "@testing-library/user-event";
import { DefaultMessagesContext } from "../src/DefaultMessagesContext";
import { ToastProvider, unsafeLocalizedString, useToast } from "../src";
import { defaultMessages } from "./util/defaultMessages";

const message = unsafeLocalizedString("This is a message for you");
const kind = "informative";

function ShowToast() {
  const { showToast } = useToast();
  return <button onClick={() => showToast({ message, kind })}>Show toast</button>;
}

describe("useToast", () => {
  test("automatically dismisses toasts after a delay", async () => {
    const { container } = render(
      <DefaultMessagesContext.Provider value={{ defaultMessages }}>
        <ToastProvider dismissAfterMs={100}>
          <ShowToast />
        </ToastProvider>
      </DefaultMessagesContext.Provider>
    );

    // No toast
    expect(container.querySelector("aside")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));

    // Toast should appear right away
    await waitFor(() => container.querySelector("aside"), { timeout: 1 });
    expect(container.querySelector("aside")).toHaveTextContent(message);

    // Toast should disappear withing the expected delay
    await waitForElementToBeRemoved(() => container.querySelector("aside"), { timeout: 100 });
  });
});
