/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Drawer, Row, Typography } from "antd";
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
import { HiUser } from "react-icons/hi";
import { ShoppingBagIcon } from "@heroicons/react/16/solid";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
      <div className="flex items-center gap-4 text-2xl bg-white  p-4 ">
        <div className="flex items-center justify-cente border  w-10 h-10 py-0 cursor-pointer">
          <ShoppingBagIcon
            onClick={() => {
              setCartDrawerOpen(true);
            }}
            className="text-gray-600 "
          />
          <span className=" text-gray-800  w-5 h-5 flex items-center justify-center">
            {cart.cartItems.length}
          </span>
        </div>

        {/* <HiUser className="text-gray-600" /> */}

        <div className="relative">
          {/* User dropdown */}
          <div className="flex items-center">
            <div className="relative">
              <HiUser
                className="text-gray-600 cursor-pointer"
                onClick={toggleDropdown}
              />
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-8 w-20 bg-white rounded-md shadow-lg z-30">
                  <div className="py-1">
                    {/* Show login/logout button based on login status */}
                    {user?.email ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/login" onClick={() => setDropdownOpen(false)}>
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                          Login
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
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
              <Row justify="space-between" align="middle">
                <Col span={6}>
                  <Typography.Text strong>PRODUCT</Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong>PRICE</Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong>SIZE</Typography.Text>
                </Col>
                <Col span={6}>
                  <Typography.Text strong>QUANTITY</Typography.Text>
                </Col>
                <Col span={4}>
                  <Typography.Text strong>TOTAL</Typography.Text>
                </Col>
              </Row>
              <Divider style={{ borderColor: "#e3dfde" }} />
              <Row gutter={[4, 4]}>
                <Col span={24}>
                  {cart?.cartItems.map((cartItem: any) => (
                    <Card key={cartItem.image} style={{ height: "10" }}>
                      <Row justify="space-between" align="middle">
                        <Col span={6}>
                          <img
                            src={cartItem.images[0]}
                            alt={cartItem.productName}
                            width={60}
                            loading="lazy"
                          />
                          <div>
                            <Typography.Text strong>
                              {cartItem.productName}
                            </Typography.Text>

                            <Button
                              type="link"
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              Remove
                            </Button>
                          </div>
                        </Col>
                        <Col span={4}>
                          <Typography.Text strong>
                            ৳{cartItem?.price}
                          </Typography.Text>
                        </Col>
                        <Col span={4}>
                          <Typography.Text strong>
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
                          <Typography.Text strong>
                            ৳{cartItem?.price * cartItem.cartQuantity}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
              </Row>

              <div className="p-10 flex flex-col items-center justify-center">
                <Button
                  onClick={() => handleClearCart()}
                  type="link"
                  icon={<LeftOutlined />}
                  className="mb-6"
                >
                  Clear Cart
                </Button>
                <div className="cart-checkout w-full max-w-md bg-white shadow-md rounded-lg p-6">
                  <div className="subtotal flex justify-center items-center mb-4">
                    <Typography.Text strong>Subtotal: </Typography.Text>
                    <Typography.Text strong className="text-lg">
                      ৳{cart?.cartTotalAmount}
                    </Typography.Text>
                  </div>
                  <Typography.Text type="secondary" className="mb-4">
                    Taxes and shipping calculated at checkout.
                  </Typography.Text>
                  <div>
                    {user ? (
                      <Link to="/checkout" className="w-full">
                        <Button onClick={() => setCartDrawerOpen(false)} block>
                          Checkout
                        </Button>
                      </Link>
                    ) : (
                      <Link to="/login" className="w-full">
                        <Button
                          className="border border-red-400 bg-gray-600 text-white"
                          onClick={() => setCartDrawerOpen(false)}
                          
                        >
                          Checkout
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="mt-10 mb-10 w-full">
                    <Link to="/auth/shop" className="w-full">
                      <Button block icon={<LeftOutlined />}>
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
