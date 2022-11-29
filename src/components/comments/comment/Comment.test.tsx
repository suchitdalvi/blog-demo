import { render, screen } from '@testing-library/react';
import { MOCK_COMMENTS } from '../../../mocks/posts.mock';

import Comment, { CommentProps } from "./Comment";

const mockComment = MOCK_COMMENTS[0];
const handleDelete = jest.fn();

const renderComponent = (props: Partial<CommentProps>) => {
  return render(<Comment comment={mockComment} currentUserId={mockComment.userId} onCommentDeleted={handleDelete} {...props}/>);
};

describe("Comment Component", () => {
  test("Should render comment correctly", () => {
    renderComponent({});

    expect( screen.getByText(mockComment.comment) ).toBeInTheDocument();
    const deleteBtn = screen.getByText('Delete');
    expect( deleteBtn ).toBeInTheDocument();
  });
});
