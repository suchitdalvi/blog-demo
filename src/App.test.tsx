import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';

test('renders medium heading', () => {
  render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>);

  const linkElement = screen.getByText(/medium/i);
  expect(linkElement).toBeInTheDocument();
});
