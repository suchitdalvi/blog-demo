import { fireEvent, render, screen } from '@testing-library/react';
import { MOCK_POSTS } from '../../../mocks/posts.mock';

import CommentForm, { CommentFormProps } from "./CommentForm";

const onCommentAdded = jest.fn();

const renderComponent = (props: Partial<CommentFormProps>) => {
  return render(<CommentForm postId={MOCK_POSTS[0].id} currentUserId={0} onCommentAdded={onCommentAdded} {...props}/>);
};

describe("CommentForm Component", () => {
  test("Should render comment correctly", () => {
    renderComponent({});

    const inputEl = screen.getByPlaceholderText("Enter your comment") as HTMLInputElement;
    const btnEl = screen.getByRole("button", { name: "submit" });

    expect( inputEl ).toBeInTheDocument();
    expect( btnEl ).toBeInTheDocument();
    fireEvent.change(inputEl, {target: {value: '23'}});
    expect( inputEl.value ).toEqual('23');
  });
});
