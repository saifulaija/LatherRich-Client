/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { Menu, Select } from "antd";

import { sidebarItems } from "../../utils/item";
import SubMenu from "antd/es/menu/SubMenu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {  sortOptions } from "../../types/global.type";
import { useAppDispatch } from "../../redux/hooks";
import { changSort } from "../../redux/features/sort/sortSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState("");

  const handleSubMenuClick = (item: any) => {
    const key = item.key;
    console.log({ key });
    navigate(`/products/${key}`);
  };

  const handleSort = (value: string) => {
    dispatch(changSort(value));
  };

  return (
    <div className="flex flex-col">
      <p className="text-gray-700 tracking-widest texl-lg font-bold uppercase text-balance mb-0 border-b-2 border-b-neutral-300 pt-10">
        Shop by Filter
      </p>

      <Menu mode="inline" theme="light">
        {sidebarItems.map((item) => (
          <SubMenu key={item.key} title={item.label}>
            {item.children &&
              item.children.map((child) => (
                <Menu.Item
                  className="text-center"
                  key={child.key}
                  onClick={() => handleSubMenuClick(child)}
                >
                  {child.label}
                </Menu.Item>
              ))}
          </SubMenu>
        ))}
      </Menu>
      <div className="flex flex-col justify-center items-center w-full">
        <label
          htmlFor="sort-select"
          className="text-gray-700 w-full tracking-widest texl-lg font-bold uppercase text-balance mb-2 border-b-2 border-b-neutral-300 pt-5"
        >
          Sort By Price
        </label>
        <Select
          id="sort-select"
          placeholder="Sort BY Price"
          value={selectedSort || undefined}
          onChange={handleSort}
          options={sortOptions}
          style={{ width: "80%" }}
        ></Select>
      </div>
     
    </div>
  );
};

export default Sidebar;
