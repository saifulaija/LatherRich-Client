/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";
import { Button, Col, Divider, Result, Row, Spin } from "antd";



const OrderSuccess = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(id);

  // Format date if available
  const formatDate = (date:any) => {
    return date ? new Date(date).toLocaleDateString() : "";
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <Spin spinning={isLoading}>
        <Result
          status="success"
          title="Your order placed successfully"
          subTitle={`Thank you, ${data?.data?.buyerName}, for your order!`}
        
         
          extra={[
            <div key="paymentDetails" >
                <div className="max-w-md border shadow-sm  rounded-md p-2 mx-auto">
                    <h4 className="text-lg underline-offset-4 mb-2 underline font-semibold text-gray-600 uppercase">Order Details</h4>
                <div className="flex justify-between items-center px-10 ">
                    <p className="font-medium text-gray-500">
                    Total Due Amount:
                    </p>
                    <p className="font-semibold text-gray-600"> ৳{data?.data?.totalPrice}</p>
                </div>
                <Divider className="mt-0"/>
                <div className="flex justify-between items-center px-10 ">
                    <p className="font-medium text-gray-500">
                    Payment Method:
                    </p>
                    <p className="font-semibold text-gray-600"> {data?.data?.paymentSystem}</p>
                </div>
                <Divider className="mt-0"/>
                <div className="flex justify-between items-center px-10 ">
                    <p className="font-medium text-gray-500">
                    Order Number:
                    </p>
                    <p className="font-semibold text-gray-600"> {data?.data?.orderNumber}</p>
                </div>
                <Divider className="mt-0"/>
                <div className="flex justify-between items-center px-10 ">
                    <p className="font-medium text-gray-500">
                    Order Date:
                    </p>
                    <p className="font-semibold text-gray-600"> {formatDate(data?.data?.orderDate)}</p>
                </div>
                <Divider className="mt-0"/>
                </div>
             
            </div>,
            <Divider key="divider" />,
            <Row key="buttons" justify="center" gutter={[16, 16]}>
              <Col>
                <Link to="/">
                  <Button
                      className=" border-teal-700 border uppercase tracking-wider font-semibold text-gray-500"
                  >
                    Back to Shop
                  </Button>
                </Link>
              </Col>
            </Row>,
          ]}
        />
      </Spin>
    </div>
  );
};

export default OrderSuccess;
