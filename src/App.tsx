import './App.css';
import React from 'react';
import TopControls from './components/TopControls.tsx';
import Results from './components/Results.tsx';
import ErrorBoundary from './errorboundary/ErrorBoundary.tsx';
import type { Character } from './interface/character-props.tsx';

interface AppState {
  searchTerm: string;
  characters: Array<Character>;
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('swapiSearchTerm') || '',
      characters: [],
      isLoading: false,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = () => {
    this.setState({ isLoading: true, error: null });

    const searchTerm = this.state.searchTerm.trim();
    const url = searchTerm
      ? `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchTerm)}`
      : 'https://rickandmortyapi.com/api/character/';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const characters =
          data.results?.map(
            (item: { name: string; image: string; gender: string }) => ({
              name: item.name,
              image: item.image,
              gender: item.gender,
            })
          ) || [];
        this.setState({ characters, isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          error: `Failed to fetch data. ${error.message}`,
          isLoading: false,
        });
      });
  };
  throwError = () => {
    this.setState({ shouldThrow: true });
    throw new Error('This is a test error for ErrorBoundary');
  };

  handleSearchChange = (term: string) => {
    this.setState({ searchTerm: term });
  };

  handleSearchSubmit = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem('swapiSearchTerm', searchTerm);
    this.fetchCharacters();
  };

  render() {
    if (this.state.shouldThrow) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
    }
    return (
      <ErrorBoundary>
        <div className="container mx-auto p-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">
            Rick and Morty Character Search
          </h1>

          <TopControls
            searchTerm={this.state.searchTerm}
            onSearchChange={this.handleSearchChange}
            onSearchSubmit={this.handleSearchSubmit}
            isLoading={this.state.isLoading}
            onThrowError={this.throwError}
          />

          <Results
            characters={this.state.characters}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
