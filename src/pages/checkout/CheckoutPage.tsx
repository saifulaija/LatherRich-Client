/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Form, Input, Table, Radio } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/features/cart/cartSlice";
import { useState } from "react";
import { TbCoinTaka } from "react-icons/tb";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { generateOrder } from "../../utils/order";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "react-toastify";
import SslCommerceImg from "../../components/sslCommerceImage/SslCommerceImg";


interface FormValues {
  fullName: string;
  mobileNumber: string;
  address: string;
  additionalInfo?: string;
}

const CheckoutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const cart = useAppSelector((state) => state.cart);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();

  const subtotal = cart?.cartTotalAmount || 0;
  const total = subtotal + shippingCost;

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  const handleShippingChange = (event: any) => {
    setShippingCost(event.target.value);
  };

  const handlePaymentMethodChange = (event: any) => {
    setPaymentMethod(event.target.value);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: any) => (
        <img src={image} alt="Product" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Update",
      dataIndex: "edit",
      key: "edit",
      render: (_:any, record: any) => (
        <Link to={`/product/${record.id}`}>
          <Button icon={<EditOutlined />} className="border border-red-400" />
        </Link>
      ),
    },
    {
      title: "Remove",
      dataIndex: "remove",
      key: "remove",
      render: (_:any, record: any) => (
        <Button
          className="border border-red-400"
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveFromCart(record.product)}
        />
      ),
    },
  ];


  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
   navigate('/')
  }

  const data = cart?.cartItems?.map((item: any) => ({
    key: item.id,
    image: item.images[0],
    quantity: item.cartQuantity,
    price: item.price,
    size: item.size,
    totalPrice: item.price * item.cartQuantity,
    id: item._id,
    product: item,
  }));

  const product = cart.cartItems.map((item: any) => ({
    productId: item._id,
    selectedQuantity: item.cartQuantity,
    image: item.images[0],
    price: item.price,
    name: item.name,
    size: item.size,
    discount: item.discount,
  }));

  const orderNumber = generateOrder();

  const onFinish = async (values: FormValues) => {
    const orderData = {
      buyerName: values.fullName,
      buyerEmail: user?.email,
      address: values.address,
      mobile: values.mobileNumber,
      additionalInfo: values.additionalInfo,
      orderProduct: product,
      totalPrice: total,
      paymentSystem: paymentMethod,
      orderNumber,
      orderDate: new Date(),
    };
    console.log(orderData);

    try {
      const res = await createOrder(orderData);
      if ("error" in res) {
        // toast.error(res?.error?.data?.message);
      } else {
        navigate(`/order/${orderNumber}`);

        toast.success(" order  created successfully");
      }
    } catch (err) {
      toast.error("something went wrong");
    }

    console.log("Received values:", orderData);
  };

  // for bkash payment ---

  // const pay = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/bkash-payment-create",
  //       {
  //         amount: 50,
  //         orderId: 2,
  //       },
  //       {
  //         withCredentials:true
  //       }
  //     );
  //   } catch (err) {
  //     console.log(err)
  //   }
  // };

  return (
    <div className="w-full">
      <div className="max-w-[1000px] flex justify-center items-center mx-auto p-10 overflow-x-scroll">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className="w-full shadow-lg rounded-lg"
        />
      </div>
      <div className="md:flex justify-between items-center container mx-auto p-10 gap-4">
        <div className="md:w-1/2">
          <div className=" border-primary border-4 rounded-lg p-5">
            <h3 className="text-lg text-primary tracking-wider font-semibold mb-4 uppercase text-balance text-center">
              YOUR'S ORDER
            </h3>
            <div className="flex justify-between items-center uppercase tracking-wide font-semibold">
              <p>Product</p>
              <p>Sub Total</p>
            </div>
            <Divider className="mt-0 border border-gray-300" />
            <div>
              <div>
                {cart.cartItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center"
                  >
                    <p className="text-gray-500">{`${item.name} x ${item.cartQuantity}`}</p>
                    <p className="font-bold">
                      {item.price * item.cartQuantity}৳
                    </p>
                  </div>
                ))}
              </div>
              <Divider className="mt-0 mb-1 border border-gray-300" />
              <div className="flex justify-between items-center mt-0">
                <p className="font-bold uppercase tracking-wide">sub Total</p>
                <p className="font-bold">{subtotal}৳</p>
              </div>
            </div>
            <Divider className="text-gray-600 font-semibold">Shipping</Divider>

            <Radio.Group
              className="flex flex-col gap-2"
              onChange={handleShippingChange}
              value={shippingCost}
              buttonStyle="solid"
              size="middle"
            >
              <div className="bg-neutral-200 p-2 rounded-sm">
                <Radio value={60}>
                  Inside Dhaka City: <span className="font-semibold">60৳</span>
                </Radio>
              </div>
              <div className="bg-neutral-200  p-2 rounded-sm">
                <Radio value={100}>
                  Inside Dhaka City: <span className="font-semibold">100৳</span>
                </Radio>
              </div>
            </Radio.Group>
            <div className="flex justify-between items-center bg-gray-300 p-2 mt-1">
              <p className="uppercase font-semibold">Total</p>
              <p className="uppercase font-semibold">{total}৳</p>
            </div>

            <Radio.Group
              className="flex flex-col gap-2 mt-2"
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
            >
              <div className="bg-neutral-200 p-2 rounded-sm">
                <Radio disabled={shippingCost === 0} value="cash-on-delivery">
                  Cash On Delivery
                </Radio>
              </div>
              <div className="bg-neutral-200 p-2 rounded-sm">
                <Radio disabled={shippingCost === 0} value="cash-on-payment">
                  Cash On Payment
                </Radio>
              </div>
            </Radio.Group>
          </div>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-lg text-primary tracking-wider font-semibold mb-4 uppercase text-balance text-center">
            BILLING & SHIPPING
          </h3>
          <Form
            name="billing_shipping_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                placeholder="Enter your full name"
                className="font-bold text-gray-700 p-2 text-lg placeholder-opacity-100"
              />
            </Form.Item>

            <Form.Item
              name="mobileNumber"
              rules={[
                { required: true, message: "Please input your mobile number!" },
              ]}
            >
              <Input
                placeholder="Enter your mobile number (11 digits)"
                className="font-bold text-gray-700 p-2 text-lg placeholder-opacity-100"
              />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                placeholder="Enter your address (House, Thana & Zilla)"
                className="font-bold text-gray-700 p-2 text-lg placeholder-opacity-100"
              />
            </Form.Item>

            <Form.Item name="additionalInfo">
              <Input.TextArea
                placeholder="Enter additional information"
                rows={4}
                className="font-bold text-gray-700  text-lg placeholder-opacity-100"
              />
            </Form.Item>

            {paymentMethod === "cash-on-delivery" && (
              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  className="btn"
                  icon={<IoPlaySkipBackOutline />}
                  loading={isLoading}
                  // onClick={()=>handleClearCart()}
                >
                  Order Place Now
                </Button>
              </Form.Item>
            )}

            {paymentMethod === "cash-on-payment" && (
              <Form.Item>
                <Button
                  block
                  htmlType="submit"
                  className="btn"
                  icon={<TbCoinTaka className="text-sm" />}
                >
                  Pay By Bkash
                </Button>
              </Form.Item>
            )}
          </Form>
        </div>
      </div>
      <SslCommerceImg />
    </div>
  );
};

export default CheckoutPage;
