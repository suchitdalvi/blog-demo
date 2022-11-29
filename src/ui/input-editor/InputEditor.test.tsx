import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputEditor, { InputEditorProps } from "./InputEditor";

const MOCK_LABEL = "Content";

const renderComponent = (props: Partial<InputEditorProps>) => {
  return render(<InputEditor label={MOCK_LABEL} {...props} />);
};

describe("InputEditor Component", () => {
  test("Should render label correctly", () => {
    renderComponent({});

    expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
  });

  test("Should render react error if passed", () => {
    const MOCK_ERROR = "Some error";
    renderComponent({ error: MOCK_ERROR });

    expect(screen.getByText(MOCK_ERROR)).toBeInTheDocument();
  });

  test("Should return enterd values", async () => {
    const handleOnChange = jest.fn();
    const props = { name: "content", id: "content", onChange: handleOnChange };

    const { container } = renderComponent(props);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    userEvent.type(container.querySelector(".ql-editor")!, "Hello, World!");

    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});
