import { act, render, RenderResult } from '@testing-library/react';
import { MOCK_COMMENTS } from '../../mocks/posts.mock';
import { MOCK_USERS } from '../../mocks/users.mock';

import Comments, { CommentsProps } from "./Comments";

const mockComment = MOCK_COMMENTS[0];
const makeSut = (props: Partial<CommentsProps>) => {
  return render(<Comments postId={mockComment.postId} currentUserId={mockComment.userId} users={MOCK_USERS} {...props}/>);
};

describe("Comments Component", () => {
  let screen: RenderResult;

  beforeEach(async () => {
    await jest.spyOn(global, "fetch").mockImplementation((url, options) => {
      console.log('method', options);
      let response = {};
      switch (options?.method) {
        case "GET":
          response = MOCK_COMMENTS;
          break;
        case "POST":
          response = {...MOCK_COMMENTS[0], comment: 'mytest'};
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

    expect( screen.getAllByText(/test comment/i).length ).toBeGreaterThan(0);
  });
});
