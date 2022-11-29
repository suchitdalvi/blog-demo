import { render, screen } from '@testing-library/react';
import { MOCK_POSTS } from '../../mocks/posts.mock';

import BlogForm, { BlogFormProps } from "./BlogForm";

const handleSubmit = jest.fn();

const renderComponent = (props: Partial<BlogFormProps>) => {
  return render(<BlogForm onFormSubmit={handleSubmit} {...props}/>);
};

describe("BlogForm Component", () => {
  test("Should render create blog form correctly", () => {
    renderComponent({});

    expect( screen.getByText('New Blog') ).toBeInTheDocument();
    const publishBtn = screen.getByText('Publish');
    expect( publishBtn ).toBeInTheDocument();
  });

  test("Should render edit blog form correctly", () => {
    renderComponent({ post: MOCK_POSTS[0] });

    expect( screen.getByText('Edit Blog') ).toBeInTheDocument();
  });
});
