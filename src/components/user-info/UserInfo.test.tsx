import { render, screen } from '@testing-library/react';

import UserInfo, { UserInfoProps } from "./UserInfo";

const MOCK_NAME = "Name";

const renderComponent = (props: Partial<UserInfoProps>) => {
  return render(<UserInfo name={MOCK_NAME} {...props}/>);
};

describe("UserInfo Component", () => {
  test("Should render name correctly", () => {
    renderComponent({});

    expect( screen.getByText(MOCK_NAME) ).toBeInTheDocument();
  });

  test("Should render user image", () => {
    const MOCK_IMG_URL = "abc.png";
    renderComponent({ profilePhoto: MOCK_IMG_URL });

    const imgTag = screen.getByAltText(MOCK_NAME);

    expect( imgTag ).toHaveAttribute('src', MOCK_IMG_URL);
  });
});
