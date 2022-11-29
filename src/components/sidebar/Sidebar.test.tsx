import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from "./Sidebar";


const renderComponent = () => {
  return render(<BrowserRouter><Sidebar /></BrowserRouter>);
};

describe("Sidebar Component", () => {
  test("Should render sidebar heading correctly", () => {
    renderComponent();

    expect( screen.getByText('Medium') ).toBeInTheDocument();
  });
});
