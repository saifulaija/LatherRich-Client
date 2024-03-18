/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Drawer, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { Link } from "react-router-dom";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import NoDataFoundPage from "../../pages/noDataFoundPage/NoDataFoundPage";

import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { IoBagAddOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

const ShoppingCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  const handleDecreaseCart = (product: any) => {
    console.log(product);
    dispatch(decreaseCart(product));
  };
  const handleIncreaseCart = (product: any) => {
    console.log(product);
    dispatch(addToCart(product));
  };
  const handleRemoveFromCart = (product: any) => {
    console.log(product);
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 text-sm bg-white  p-4 ">
        <div></div>
        <div>
          {user && (
            <Link to={`/${user?.role}/dashboard`}>
              {" "}
              <MdDashboard className="text-xl text-teal-600" />
            </Link>
          )}
        </div>
        <div>
          <Badge count={cart.cartItems.length ? cart.cartItems.length : 0}>
            <Button
              onClick={() => {
                setCartDrawerOpen(true);
              }}
              className=" text-teal-800 flex items-center justify-center gap-1"
            >
              <IoBagAddOutline
                className="text-teal-800 font-semibold"
                size={20}
              />
              <span className="font-semibold text-[14px]">
                ৳ {cart.cartTotalAmount}
              </span>
            </Button>
          </Badge>
        </div>

        <div>
          {user ? (
            <Button
              icon={<UserOutlined />}
              className="uppercase tracking-wide font-semibold text-teal-700"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                icon={<UserOutlined />}
                className="uppercase tracking-wide font-semibold text-teal-700"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
      >
        <div
          style={{ maxWidth: "1000px", margin: "auto", padding: "10px 0px" }}
        >
          {cart.cartItems.length === 0 ? (
            <NoDataFoundPage />
          ) : (
            <>
              <Row
                justify="space-between"
                align="middle"
                className="text-gray-600"
              >
                <Col span={6}>
                  <Typography.Text strong className="text-gray-600 text-sm">
                    PRODUCT
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong className="text-gray-600 text-sm">
                    PRICE
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong className="text-gray-600 text-sm">
                    SIZE
                  </Typography.Text>
                </Col>
                <Col span={6}>
                  <Typography.Text strong className="text-gray-600 text-sm">
                    QUANTITY
                  </Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong className="text-gray-600 text-sm">
                    TOTAL
                  </Typography.Text>
                </Col>
              </Row>

              <Row gutter={[4, 4]}>
                <Col span={24} className="space-y-2">
                  {cart?.cartItems.map((cartItem: any) => (
                    <Card
                      key={cartItem.image}
                      style={{ height: "10" }}
                      className="border"
                    >
                      <Row justify="space-between" align="stretch">
                        <Col span={6}>
                          <div className="flex justify-center items-center gap-1">
                            <img
                              src={cartItem.images[0]}
                              alt={cartItem.productName}
                              width={30}
                              height={30}
                              loading="lazy"
                            />

                            <Typography.Text
                              strong
                              className="text-gray-500 text-sm overflow-hidden"
                            >
                              {cartItem.name.length > 10
                                ? cartItem.name.substring(0, 10) + "..."
                                : cartItem.name}
                            </Typography.Text>
                          </div>

                          <Button
                            type="link"
                            onClick={() => handleRemoveFromCart(cartItem)}
                          >
                            {" "}
                            Remove
                          </Button>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-sm"
                          >
                            ৳{cartItem?.price}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-sm"
                          >
                            size {cartItem?.size}
                          </Typography.Text>
                        </Col>
                        <Col span={6}>
                          <div className="flex items-center justify-center gap-4">
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold px-3 py-1 rounded-md focus:outline-none"
                              onClick={() => handleDecreaseCart(cartItem)}
                            >
                              -
                            </button>
                            <span className="text-gray-800">
                              {cartItem.cartQuantity}
                            </span>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold px-3 py-1 rounded-md focus:outline-none"
                              onClick={() => handleIncreaseCart(cartItem)}
                            >
                              +
                            </button>
                          </div>
                        </Col>
                        <Col span={4}>
                          <Typography.Text
                            strong
                            className="text-gray-500 text-sm"
                          >
                            ৳{cartItem?.price * cartItem.cartQuantity}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
              </Row>

              <div className="flex justify-around items-center">
                <Button
                  onClick={() => handleClearCart()}
                  type="link"
                  icon={<LeftOutlined />}
                  className=""
                >
                  Clear Cart
                </Button>
                <p className="text-gray-500 font-semibold">
                  Sub Total: ৳{cart?.cartTotalAmount}
                </p>
              </div>

              <div className="p-4 flex flex-col items-center justify-center space-x-4">
                <div className=" w-full max-w-md   p-6">
                  <Typography.Text type="secondary" className="mb-8">
                    Taxes and shipping calculated at checkout.
                  </Typography.Text>
                  <div>
                    {user ? (
                      <Link to="/checkout" className="w-full">
                        <Button
                          className="border border-teal-600 uppercase tracking-wider font-semibold text-gray-500"
                          onClick={() => setCartDrawerOpen(false)}
                          block
                          icon={<LeftOutlined />}
                        >
                          Checkout
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/login" className="w-full">
                        <Button
                          className="border border-teal-600 uppercase tracking-wider font-semibold text-gray-500"
                          onClick={() => setCartDrawerOpen(false)}
                          block
                          icon={<LeftOutlined />}
                        >
                          Checkout
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-5 mb-5 w-full">
                    <Link to="/" className="w-full">
                      <Button
                        onClick={() => setCartDrawerOpen(false)}
                        className="border border-teal-600 uppercase tracking-wider font-semibold text-gray-500"
                        block
                        icon={<LeftOutlined />}
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default ShoppingCart;
