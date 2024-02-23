
import { Result, Button } from 'antd';

const NoDataFoundPage = () => {
  return (
    <Result
      status="404"
      title="No Data Found"
      subTitle="Sorry, we couldn't find any data."
      extra={<Button type="primary">Back to Home</Button>}
    />
  );
};

export default NoDataFoundPage;
