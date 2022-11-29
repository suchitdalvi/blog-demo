import { render, screen } from '@testing-library/react';

import InputText, { InputTextProps } from "./InputText";

const MOCK_LABEL = "Name";

const renderComponent = (props: Partial<InputTextProps>) => {
  return render(<InputText label={MOCK_LABEL} type="text" {...props} />);
};

describe("InputText Component", () => {
  test("Should render label correctly", () => {
    renderComponent({});

    expect( screen.getByText(MOCK_LABEL) ).toBeInTheDocument();
  });

  test("Should render react error if passed", () => {
    const MOCK_ERROR = "Some error";
    renderComponent({ error: MOCK_ERROR });

    expect( screen.getByText(MOCK_ERROR) ).toBeInTheDocument();
  });
});
