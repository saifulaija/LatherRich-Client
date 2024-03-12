/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Menu } from 'antd';

import type { MenuProps } from 'antd';
import { IoManOutline } from 'react-icons/io5';
import { RiWomenFill } from 'react-icons/ri';
import { GiKidSlide } from 'react-icons/gi';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('MENS', 'sub1', <IoManOutline />, [
    getItem('CASUAL', 'man-causal'),
    getItem('FORMAL', 'man-formal'),
    getItem('SPORTS', 'man-sport'),
  ]),
  getItem('WOMENS', 'sub2', <RiWomenFill/>, [
    getItem('CASUAL', 'women-causal'),
    getItem('FORMAL', 'women-formal'),
    getItem('SPORTS', 'women-sport'),
  ]),
  getItem('KIDS', 'sub3', <GiKidSlide />, [
    getItem('CASUAL', 'kid-causal'),
    getItem('FORMAL', 'kid-formal'),
    getItem('SPORTS', 'kid-sport'),
  ]),
];

const Sidebar: React.FC = () => {
  const handleItemClick = (item: any) => {
    console.log('Clicked menu item key:', item.key);
  };

  return (
    <Menu
      mode="inline"
      style={{ width: 256 }}
      items={items}
      onClick={handleItemClick} // Add onClick event handler to Menu component
    />
  );
};

const SidebarWithExploreByCategory: React.FC = () => {
  return (
    <div className='p-120px'>

      <Sidebar />
    </div>
  );
};

export default SidebarWithExploreByCategory;
