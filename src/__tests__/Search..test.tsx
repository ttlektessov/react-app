import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Search from '../components/Search';
import '@testing-library/jest-dom';

describe('Search Component', () => {
  const mockOnSearchChange = vi.fn();
  const mockOnSearchSubmit = vi.fn();

  beforeEach(() => {
    mockOnSearchChange.mockClear();
    mockOnSearchSubmit.mockClear();
    localStorage.clear();
  });

  test('Render search input and search button', () => {
    render(
      <Search
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
        isLoading={false}
      ></Search>
    );
    expect(
      screen.getByPlaceholderText('Search Rick and Morty characters...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('Updates input value when user types', () => {
    render(
      <Search
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
        isLoading={false}
      />
    );
    const input = screen.getByPlaceholderText(
      'Search Rick and Morty characters...'
    );
    fireEvent.change(input, { target: { value: 'rick' } });
    expect(mockOnSearchChange).toHaveBeenCalledWith('rick');
  });

  test('Check if button works', () => {
    const searchTerm = 'morty';
    render(
      <Search
        searchTerm={searchTerm}
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
        isLoading={false}
      />
    );
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
    expect(mockOnSearchSubmit).toHaveBeenCalledTimes(1);
  });

  test('Disables input and button when loading', () => {
    render(
      <Search
        searchTerm=""
        onSearchChange={mockOnSearchChange}
        onSearchSubmit={mockOnSearchSubmit}
        isLoading={true}
      />
    );
    expect(
      screen.getByPlaceholderText('Search Rick and Morty characters...')
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Searching...' })).toBeDisabled();
  });
});
