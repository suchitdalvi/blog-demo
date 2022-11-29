import { act, render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {  MOCK_LIKES } from '../../mocks/posts.mock';

import Likes, { LikesProps } from "./Likes";

const mockLike = MOCK_LIKES[0];

const makeSut = (props: Partial<LikesProps>) => {
  return render(<Likes postId={mockLike.postId} currentUserId={mockLike.userId} {...props}/>, { wrapper: BrowserRouter });
};

describe("Likes Component", () => {
  let screen: RenderResult;

  beforeEach(async () => {
    await jest.spyOn(global, "fetch").mockImplementation((url, options) => {
      console.log('method', options);
      let response = {};
      switch (options?.method) {
        case "GET":
          response = MOCK_LIKES;
          break;
      }
      return Promise.resolve({
        json: () => Promise.resolve(response),
      } as Response);
    });
  });

  test("Should render Comments correctly", async() => {
    await act(async () => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      screen = makeSut({});
    });

    expect( screen.getByText(MOCK_LIKES.length) ).toBeInTheDocument();
  });
});
