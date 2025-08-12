import React from 'react';
import Card from './Card';
import type { Character } from '../interface/character-props.tsx';

class CardList extends React.Component<{ characters: Character[] }> {
  render() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {this.props.characters.map((character, index) => (
          <Card key={index} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
