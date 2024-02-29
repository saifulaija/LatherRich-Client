import React from 'react';
import { Button, Empty } from 'antd';

const NoDataFoundPage: React.FC = () => (
  <div className='flex justify-center items-center h-full'>
    <Empty  >
    <Button >Back to Shop</Button>
    </Empty>
    
  </div>
);

export default NoDataFoundPage;
