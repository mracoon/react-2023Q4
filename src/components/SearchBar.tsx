import { Component, ReactNode } from 'react';
import searchIcon from '../assets/search.svg';

export default class SearchBar extends Component {
  render(): ReactNode {
    return (
      <>
        <div className="relative w-full">
          <img
            src={searchIcon}
            alt="serchIcon"
            className="absolute inset-4 pointer-events-none w-4 h-4 text-gray-500 dark:text-gray-400"
          />
          <input
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-primary"
            type="search"
            placeholder="What are you looking for?"
          />
          <button className="btn-primary text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2">
            Search
          </button>
        </div>
      </>
    );
  }
}
