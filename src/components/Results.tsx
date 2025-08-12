import React from 'react';
import CardList from './CardList';
import Spinner from './Spinner';
import type { Character } from '../interface/character-props.tsx';

interface ResultsProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
}

class Results extends React.Component<ResultsProps> {
  render() {
    const { characters, isLoading, error } = this.props;

    if (error) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      );
    }

    if (isLoading) {
      return <Spinner />;
    }

    if (characters.length === 0) {
      return (
        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          No characters found. Try a different search.
        </div>
      );
    }

    return (
      <>
        <CardList characters={characters} />
      </>
    );
  }
}

export default Results;
