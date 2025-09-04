import { render, screen } from '@testing-library/react';
import Results from '../components/Results';
import '@testing-library/jest-dom';
import type { Character } from '../interface/character-props';

const mockCharacters: Character[] = [
  { name: 'Rick Sanchez', image: 'rick.png', gender: 'Male' },
  { name: 'Morty Smith', image: 'morty.png', gender: 'Male' },
];

describe('Results Component', () => {
  test('Renders correct number of items when data is provided', () => {
    render(
      <Results characters={mockCharacters} isLoading={false} error={null} />
    );
    const items = screen.getAllByRole('heading');
    expect(items.length).toBe(mockCharacters.length);
  });
  test("Displays 'no results' message when no data is available", () => {
    render(<Results characters={[]} isLoading={false} error={null} />);
    expect(
      screen.getByText('No characters found. Try a different search.')
    ).toBeInTheDocument();
  });
  test('Shows loading state while fetching data', () => {
    render(<Results characters={[]} isLoading={true} error={null} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  test('Displays error message when API call fails', () => {
    const errorMessage = 'Failed to fetch';
    render(<Results characters={[]} isLoading={false} error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
