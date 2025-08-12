import { Component } from 'react';
import Search from './Search.tsx';

interface TopControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  isLoading: boolean;
  onThrowError: () => void;
}

class TopControls extends Component<TopControlsProps> {
  render() {
    return (
      <div className="p-4 bg-gray-50 rounded-lg mb-6">
        <Search
          searchTerm={this.props.searchTerm}
          onSearchChange={this.props.onSearchChange}
          onSearchSubmit={this.props.onSearchSubmit}
          isLoading={this.props.isLoading}
        />
        <button
          onClick={this.props.onThrowError}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Test Error Boundary
        </button>
      </div>
    );
  }
}

export default TopControls;
