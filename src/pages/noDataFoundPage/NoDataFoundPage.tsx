import React from 'react';
import {  Empty } from 'antd';
import { Link } from 'react-router-dom';

const NoDataFoundPage: React.FC = () => (
  <div className='flex justify-center items-center h-full'>
    <Empty  >
    <Link to='/'>
    <button >Back to Shop</button>
    </Link>
    </Empty>
    
  </div>
);

export default NoDataFoundPage;
