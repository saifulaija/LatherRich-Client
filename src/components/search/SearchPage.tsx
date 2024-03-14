// SearchPage.js
import  { useState } from 'react';


import GlobalSearch from '../globalSearch/GlobalSearch';
import SearchResultProduct from '../searchResult/SearchResultProduct';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      {/* Render the GlobalSearch component in the navbar */}
      <header>
        <GlobalSearch onSearch={handleSearch} />
      </header>

      {/* Conditionally render the SearchResultProduct component */}
      <main>
        {searchQuery && <SearchResultProduct searchQuery={searchQuery} />}
      </main>
    </div>
  );
};

export default SearchPage;
