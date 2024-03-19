// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Button, Dropdown, Table, Tag } from "antd";
// import { useState } from "react";

// import { useGetAllOrdersQuery ,useUpdateOrderDeliveryMutation} from "../../redux/features/order/orderApi";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { toast } from "sonner";

// const items = [
//   {
//     label: "Shipped",
//     key: "shipped",
//   },
//   {
//     label: "Delivered",
//     key: "delivered",
//   },
// ];

// interface UpdateData {
//   key: string;
// }

// const ShowOrder = () => {
//   const [userId, setUserId] = useState("");
//   const { data: orders, isLoading, isFetching } = useGetAllOrdersQuery("");
 
//   const [updated,{data}] = useUpdateOrderDeliveryMutation();
//   console.log(data)



//   const handleStatusUpdate = async(data: UpdateData) => {
//     const updateData = {
//       id: userId,
//       data: {
//         deliveryStatus: data.key,
//       },
//     };

//     console.log(updateData)

//   await  updated(updateData);
//     toast.success('status updated successfully')
    
//   };

//   const menuProps = {
//     items,
//     onClick: handleStatusUpdate,
//   };

//   const columns = [
//     {
//       title: "Buyer Name",
//       key: "buyerName",
//       dataIndex: "buyerName",
    
//     },
//     {
//       title: "Order Serial",
//       key: "orderNumber",
//       dataIndex: "orderNumber",
//     },
//     {
//       title: "Order Date",
//       dataIndex: "orderDate",
//       key: "orderDate",
//       render: (text) => moment(text).format("MMMM Do YYYY"),
//     },
//     {
//       title: "Payment System",
//       key: "paymentSystem",
//       dataIndex: "paymentSystem",
//     },
//     {
//       title: "Order Amount (৳)",
//       key: "totalPrice",
//       dataIndex: "totalPrice",
//       render: (price) => `৳${price}`,
//     },
//     {
//       title: "Delivery Status",
//       dataIndex: "deliveryStatus",
//       key: "deliveryStatus",
//       render: (status, record) => (
//         <Tag color={record.deliveryStatus === "Delivered" ? "green" : "red"}>
//           {record.deliveryStatus}
//         </Tag>
//       ),
//     },
//     {
//       title: "Action",
//       key: "update",
//       render: (item: any) => (
//         <Dropdown menu={menuProps} trigger={["click"]}>
//           <Button onClick={() => setUserId(item.key)}>Update Delivery</Button>
//         </Dropdown>
//       ),
//     },
//     {
//       title: "Action",
//       key: "details",
//       render: (_: any, record: any) => (
//         <Link to={`/superAdmin/order-details/${record.key}`}>
//           <Button>Details</Button>
//         </Link>
//       ),
//     },
//   ];

//   const tableData = orders?.data?.map(
//     ({
//       _id,
//       buyerName,
//       mobile,
//       orderDate,
//       deliveryStatus,
//       orderNumber,
//       totalPrice,
//       paymentSystem,
//     }: any) => ({
//       key: _id,
//       buyerName,
//       mobile,
//       orderDate,
//       deliveryStatus,
//       orderNumber,
//       totalPrice,
//       paymentSystem,
//     })
//   );

//   return (
//     <Table loading={isFetching || isLoading} columns={columns} dataSource={tableData} />
//   );
// };

// export default ShowOrder;




/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Dropdown, Table, Tag } from "antd";
import { useState } from "react";
import { useGetAllOrdersQuery, useUpdateOrderDeliveryMutation } from "../../redux/features/order/orderApi";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const items = [
  {
    label: "Shipped",
    key: "shipped",
  },
  {
    label: "Delivered",
    key: "delivered",
  },
];

interface UpdateData {
  key: string;
}

const ShowOrder = () => {
  const [userId, setUserId] = useState("");
  const { data: orders, isLoading, isFetching } = useGetAllOrdersQuery("");
  const [updateOrderDelivery] = useUpdateOrderDeliveryMutation();

  const handleStatusUpdate = async (data: UpdateData) => {
    const updateData = {
      id: userId,
      data: {
        deliveryStatus: data.key,
      },
    };

    try {
      await updateOrderDelivery(updateData);
      toast.success('Status updated successfully');
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Failed to update status', error);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns = [
    {
      title: "Buyer Name",
      key: "buyerName",
      dataIndex: "buyerName",
    },
    {
      title: "Order Serial",
      key: "orderNumber",
      dataIndex: "orderNumber",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text: string) => moment(text).format("MMMM Do YYYY"),
    },
    {
      title: "Payment System",
      key: "paymentSystem",
      dataIndex: "paymentSystem",
    },
    {
      title: "Order Amount (৳)",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (price: number) => `৳${price}`,
    },
    {
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (status: string, record: any) => (
        <Tag color={record.deliveryStatus === "Delivered" ? "green" : "red"}>
          {record.deliveryStatus}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "update",
      render: (item: any) => (
        <Dropdown menu={menuProps} trigger={["click"]}>
          <Button onClick={() => setUserId(item.key)}>Update Delivery</Button>
        </Dropdown>
      ),
    },
    {
      title: "Action",
      key: "details",
      render: (_: any, record: any) => (
        <Link to={`/superAdmin/order-details/${record.key}`}>
          <Button>Details</Button>
        </Link>
      ),
    },
  ];

  const tableData = orders?.data?.map(
    ({
      _id,
      buyerName,
      mobile,
      orderDate,
      deliveryStatus,
      orderNumber,
      totalPrice,
      paymentSystem,
    }: any) => ({
      key: _id,
      buyerName,
      mobile,
      orderDate,
      deliveryStatus,
      orderNumber,
      totalPrice,
      paymentSystem,
    })
  );

  return (
    <Table loading={isFetching || isLoading} columns={columns} dataSource={tableData} />
  );
};

export default ShowOrder;

