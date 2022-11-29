import { render, screen } from '@testing-library/react';

import PostDate, { PostDateProps } from "./PostDate";

const currentDate = new Date().getTime();

const renderComponent = (props: Partial<PostDateProps>) => {
  return render(<PostDate postDate={currentDate} {...props}/>);
};

describe("PostDate Component", () => {
  test("Should render post date format correctly", () => {
    renderComponent({});

    expect( screen.getByText(/Posted/) ).toBeInTheDocument();
  });
});
