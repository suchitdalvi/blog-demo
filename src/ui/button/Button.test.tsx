import { fireEvent, render, screen } from "@testing-library/react";

import Button, { ButtonProps } from "./Button";

const MOCK_BTN_TEXT = "Submit";

const renderComponent = (props: Partial<ButtonProps>) => {
  return render(<Button text={MOCK_BTN_TEXT} {...props} />);
};

describe("Button Component", () => {
  test("Should render label correctly", () => {
    renderComponent({});

    expect(screen.getByRole("button", { name: MOCK_BTN_TEXT })).toBeInTheDocument();
  });

  test("Should render loader if in loader state", () => {
    renderComponent({ loading: true, type: "button"});

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("Should not render full width", () => {
    renderComponent({ fullWidth: false, type: "submit"});
    const colorButton = screen.getByRole("button", { name: MOCK_BTN_TEXT });

    expect(colorButton).not.toHaveClass('w-full');
  });


  test("Should handle clicked", async () => {
    const handleOnClik = jest.fn();
    renderComponent({ classes:" ", onClick: handleOnClik, type: "reset" });

    const colorButton = screen.getByRole("button", { name: MOCK_BTN_TEXT });
    fireEvent.click(colorButton);

    expect(handleOnClik).toHaveBeenCalledTimes(1);
  });
});
