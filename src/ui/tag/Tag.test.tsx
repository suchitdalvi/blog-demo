import { render, screen } from '@testing-library/react';

import Tag, { TagProps } from "./Tag";

const MOCK_LABEL = "Name";

const renderComponent = (props: Partial<TagProps>) => {
  return render(<Tag text={MOCK_LABEL} {...props} />);
};

describe("Tag Component", () => {
  test("Should render label correctly", () => {
    renderComponent({});

    expect( screen.getByText(MOCK_LABEL) ).toBeInTheDocument();
  });
});
