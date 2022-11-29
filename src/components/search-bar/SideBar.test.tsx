import { fireEvent, render, screen } from '@testing-library/react';

import SearchBar, { SearchBarProps } from "./SearchBar";

const handleSearch = jest.fn();

const renderComponent = (props: Partial<SearchBarProps>) => {
  return render(<SearchBar onSearch={handleSearch} {...props}/>);
};

describe("SearchBar Component", () => {
  test("Should render comment correctly", () => {
    renderComponent({});

    const inputEl = screen.getByPlaceholderText("Search here...");

    expect( inputEl ).toBeInTheDocument();
    fireEvent.change(inputEl, {target: {value: '23'}});
    expect( handleSearch ).toHaveBeenCalledTimes(1);
  });
});
