import  { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const GlobalSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (value) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <Search
      placeholder="Search..."
      allowClear
      enterButton={<SearchOutlined />}
      size="small"
      onSearch={handleSearch}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default GlobalSearch;
