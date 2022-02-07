import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createButton, createToast, unsafeLocalizedString, useToast } from "../src";

const Button = createButton({});
const { ToastProvider } = createToast(Button, {});
const message = unsafeLocalizedString("This is a message for you");
const kind = "informative";

function ShowToast() {
  const { showToast } = useToast();
  return <button onClick={() => showToast({ message, kind })}>Show toast</button>;
}

describe("useToast", () => {
  test("automatically dismisses toasts after a delay", async () => {
    const { container } = render(
      <ToastProvider dismissAfterMs={100}>
        <ShowToast />
      </ToastProvider>
    );

    // No toast
    expect(container.querySelector("aside")).not.toBeInTheDocument();

    user.click(screen.getByRole("button"));

    // Toast should appear right away
    await waitFor(() => container.querySelector("aside"), { timeout: 1 });
    expect(container.querySelector("aside")).toHaveTextContent(message);

    // Toast should disappear withing the expected delay
    await waitForElementToBeRemoved(() => container.querySelector("aside"), { timeout: 100 });
  });
});
