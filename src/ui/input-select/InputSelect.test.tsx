import { render, screen } from '@testing-library/react';

import { ALL_CATEGORIES } from '../../shared/constants/app.constants';
import InputSelect, { InputSelectProps } from "./InputSelect";

const MOCK_LABEL = "Category";

const renderComponent = (props: Partial<InputSelectProps>) => {
  return render(<InputSelect label={MOCK_LABEL} options={ALL_CATEGORIES} {...props} />);
};

describe("InputSelect Component", () => {
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
