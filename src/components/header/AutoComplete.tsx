/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoComplete } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
  { label: "Clear Filter", value: null },
  { label: "Man", value: "man" },
  { label: "Women", value: "women" },
  { label: "Kid", value: "kid" },
];

const AutoCompleteNew = () => {
  const [options, setOptions] = useState(categoryOptions);
  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    if (searchText) {
      setOptions([
        ...categoryOptions,
        {
          label: `${searchText}`,
          value: `${searchText}`,
        },
        {
          label: `${searchText} ${searchText}`,
          value: `${searchText} ${searchText}`,
        },
        {
          label: `${searchText} ${searchText} ${searchText}`,
          value: `${searchText} ${searchText} ${searchText}`,
        },
      ]);
    } else {
      setOptions(categoryOptions); // Reset options to default when no search text
    }
  };

  return (
    <div className="w-full">
      <AutoComplete
        className="w-md" // Set initial width
        placeholder="product search-----"
        options={options} // Use dynamic options
        filterOption={true}
        onSearch={(value: any) => {
          handleSearch(value);
          if (value.trim() !== "") { // Check if search text is not empty
            navigate(`/products/search?q=${encodeURIComponent(value)}`);
          }
        }}
      ></AutoComplete>
    </div>
  );
};

export default AutoCompleteNew;
