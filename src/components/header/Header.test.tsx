import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import authService from "../../shared/services/auth.service";
import store from '../../redux/store';
import Header from './Header';
import { MOCK_USERS } from '../../mocks/users.mock';

const renderComponent = () => {
  return render(<Provider store={store}><Header /></Provider>, {wrapper: BrowserRouter});
};

describe("Header Component", () => {
  test("Should render sidebar heading correctly", () => {

    renderComponent();

    expect( screen.getByText('Medium') ).toBeInTheDocument();
  });

  test("Should render sidebar with logout button", () => {
    jest.spyOn(authService, 'getLoggedInUser').mockReturnValue(MOCK_USERS[0]);
    const logoutSpy = jest.spyOn(authService, 'logout');

    renderComponent();
    const logutBtn = screen.getByRole('button', { name: "Logout"});
    expect(logutBtn).toBeInTheDocument();
    
    fireEvent.click(logutBtn);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });
});
