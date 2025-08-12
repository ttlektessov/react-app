import React from 'react';

interface SearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  isLoading: boolean;
}

class Search extends React.Component<SearchProps> {
  render() {
    return (
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
          placeholder="Search Rick and Morty characters..."
          className="flex-1 p-2 border border-gray-300 rounded"
          disabled={this.props.isLoading}
        />
        <button
          onClick={this.props.onSearchSubmit}
          disabled={this.props.isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {this.props.isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }
}

export default Search;
