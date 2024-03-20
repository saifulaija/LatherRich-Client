import { useParams } from "react-router-dom";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import { Button, Divider, Table } from "antd";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";

// DetailRow component
const DetailRow = ({ title, value }:{title:string, value:string}) => {
  return (
    <div className="flex justify-between items-center px-10 ">
      <p className="font-medium text-gray-500">{title}:</p>
      <p className="font-semibold text-gray-600">{value}</p>
    </div>
  );
};

const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(id);
  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: image => <img src={image} width={30} alt="" />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Product Size',
      dataIndex: 'size',
      render: size => <Button>size/{size}</Button>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Product Code',
      dataIndex: 'code',
    },
    {
      title: 'Ordered Quantity',
      dataIndex: 'selectedQuantity',
    },
  ];

  const dataSource = data?.data?.orderProduct.map((product, index) => ({
    key: index,
    image: product.image,
    name: product.name, 
    price: product.price, 
    selectedQuantity: product.selectedQuantity,
    size:product.size,
    code:product.code 
  }));

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "";
  };

  return (
    <div className="full">
      <CustomeDivider title="Order details" />
      <div className="container mx-auto ">
        <div className="max-w-[800px] container mx-auto">
          <DetailRow
            title="Total Due Amount"
            value={`৳${data?.data?.totalPrice}`}
          />
          <Divider className="mt-0" />
          <DetailRow
            title="Payment Method"
            value={data?.data?.paymentSystem}
          />
          <Divider className="mt-0" />
          <DetailRow
            title="Order Number"
            value={data?.data?.orderNumber}
          />
          <Divider className="mt-0" />
          <DetailRow
            title="Order Date"
            value={formatDate(data?.data?.orderDate)}
          />
          <Divider className="mt-0" />
        </div>
        <div className="">
        <CustomeDivider title="Ordered Products" />
        <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
