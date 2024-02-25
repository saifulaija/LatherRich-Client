
import { Result, Button } from 'antd';

const NoDataFoundPage = () => {
  return (
    <Result
      status="info"
      title="No Data Found"
      subTitle="Sorry, we couldn't find any data."
      extra={<Button type="primary">Back to Shop</Button>}
    />
  );
};

export default NoDataFoundPage;
