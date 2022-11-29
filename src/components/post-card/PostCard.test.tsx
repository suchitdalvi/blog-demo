import { render, screen, } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { MOCK_POSTS } from '../../mocks/posts.mock';
import PostCard, { PostCardProps } from "./PostCard";

const MOCK_POST = MOCK_POSTS[0];

const makeSut = (props: Partial<PostCardProps>) => {
  return render(<PostCard post={MOCK_POST} currentUserId={0} {...props}/>, {wrapper: BrowserRouter});
};

describe("PostCard Component", () => {
  test("Should render title correctly", async() => {
    makeSut({});

    expect( screen.getByText(MOCK_POST.title) ).toBeInTheDocument();
  });

  test("Should render edit if post user is logged in user", async () => {
    makeSut({ currentUserId: MOCK_POST.userId });

    expect( screen.getByText(/Edit/) ).toBeInTheDocument();
    expect( screen.getByText(/Delete/) ).toBeInTheDocument();
  });
});
