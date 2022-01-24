import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import user from "@testing-library/user-event";
import { createButton, createSnackbar, unsafeLocalizedString, useSnackbar } from "../src";

const Button = createButton({});
const { SnackbarProvider } = createSnackbar(Button, {});
const message = unsafeLocalizedString("This is a message for you");
const kind = "informative";

function ShowSnackbar() {
  const { showSnackbar } = useSnackbar();
  return <button onClick={() => showSnackbar({ message, kind })}>Show snackbar</button>;
}

describe("useSnackbar", () => {
  test("automatically dismisses snackbars after a delay", async () => {
    const { container } = render(
      <SnackbarProvider dismissAfterMs={100}>
        <ShowSnackbar />
      </SnackbarProvider>
    );

    // No snackbar
    expect(container.querySelector("aside")).not.toBeInTheDocument();

    user.click(screen.getByRole("button"));

    // Snackbar should appear right away
    await waitFor(() => container.querySelector("aside"), { timeout: 1 });
    expect(container.querySelector("aside")).toHaveTextContent(message);

    // Snackbar should disappear withing the expected delay
    await waitForElementToBeRemoved(() => container.querySelector("aside"), { timeout: 100 });
  });
});
