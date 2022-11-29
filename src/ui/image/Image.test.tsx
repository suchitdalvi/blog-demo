import { render, screen } from '@testing-library/react';

import Image, { ImageProps } from "./Image";

const MOCK_SRC = "mock-image-src";
const MOCK_ALT = "Name";

const renderComponent = (props: Partial<ImageProps>) => {
  return render(<Image src={MOCK_SRC} alt={MOCK_ALT} {...props} />);
};

describe("Image Component", () => {
  test("Should render image alt correctly", () => {
    renderComponent({});

    expect( screen.getByAltText(MOCK_ALT) ).toBeInTheDocument();
  });
});
