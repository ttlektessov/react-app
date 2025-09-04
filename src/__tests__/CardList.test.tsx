import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList';
import '@testing-library/jest-dom';
import type { Character } from '../interface/character-props';

const mockCharacters: Character[] = [
  { name: 'Rick Sanchez', image: 'rick.png', gender: 'Male' },
  { name: 'Morty Smith', image: 'morty.png', gender: 'Male' },
];
describe('CardList Component', () => {
  test('Renders a list of cards', () => {
    render(<CardList characters={mockCharacters} />);
    const characterNames = screen.getAllByRole('heading', { level: 3 });
    expect(characterNames).toHaveLength(2);
    expect(characterNames[0]).toHaveTextContent('Rick Sanchez');
    expect(characterNames[1]).toHaveTextContent('Morty Smith');
  });
});
