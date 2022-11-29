import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MOCK_POSTS } from '../../mocks/posts.mock';
import { MOCK_USERS } from '../../mocks/users.mock';

import Posts, { PostsProps } from "./Posts";

const renderComponent = (props: Partial<PostsProps>) => {
  return render(<Posts posts={MOCK_POSTS} users={MOCK_USERS} currentUserId={0} {...props}/>, { wrapper: BrowserRouter });
};

describe("Posts Component", () => {
  test("Should render posts correctly", async () => {
    renderComponent({});

    expect( screen.getByText(MOCK_POSTS[0].title) ).toBeInTheDocument();

    await fireEvent.scroll(window, { target: { scrollY: 300 } });

    expect( screen.getByText(MOCK_POSTS[4].title) ).toBeInTheDocument();
  });
});
