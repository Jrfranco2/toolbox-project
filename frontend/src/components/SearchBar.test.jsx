import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  test('renders SearchBar with input and button', () => {
    const handleSearchMock = jest.fn();
    const setSearchTermMock = jest.fn();
    const searchTerm = '';

    render(
      <SearchBar
        handleSearch={handleSearchMock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTermMock}
      />
    );

    expect(
      screen.getByPlaceholderText('Search by file name')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls setSearchTerm when input changes', () => {
    const handleSearchMock = jest.fn();
    const setSearchTermMock = jest.fn();
    const searchTerm = '';

    render(
      <SearchBar
        handleSearch={handleSearchMock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTermMock}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Search by file name'), {
      target: { value: 'test' },
    });
    expect(setSearchTermMock).toHaveBeenCalledWith('test');
  });

  test('calls handleSearch when form is submitted', () => {
    const handleSearchMock = jest.fn((e) => e.preventDefault());
    const setSearchTermMock = jest.fn();
    const searchTerm = '';

    render(
      <SearchBar
        handleSearch={handleSearchMock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTermMock}
      />
    );

    fireEvent.submit(screen.getByText('Search'));
    expect(handleSearchMock).toHaveBeenCalled();
  });
});
