import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { MOCK_POSTS } from '../../mocks/posts.mock';
import store from '../../redux/store';

import BlogDeails, { BlogDeailsProps } from "./BlogDetails";

const makeSut = (props: Partial<BlogDeailsProps>) => {
  return render(<Provider store={store}><BlogDeails post={MOCK_POSTS[0]} {...props}/></Provider>, {wrapper: BrowserRouter});
};

describe("BlogDeails Component", () => {
  test("Should render create blog form correctly", async() => {
    await act(async () => {
      makeSut({});
    });
    

    expect( screen.getByText(MOCK_POSTS[0].title) ).toBeInTheDocument();
  });
});
