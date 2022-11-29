import { render, screen } from '@testing-library/react';

import Loader from "./Loader";

const renderComponent = () => {
  return render(<Loader />);
};

describe("Loader Component", () => {
  test("Should render loader correctly", () => {
    renderComponent();

    expect( screen.getByTestId("loader") ).toBeInTheDocument();
  });
});
