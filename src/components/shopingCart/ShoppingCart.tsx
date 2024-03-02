/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Divider, Drawer, Flex, Image, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";



import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../../redux/features/cart/cartSlice";
import NoDataFoundPage from "../../pages/noDataFoundPage/NoDataFoundPage";

const ShoppingCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);

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
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cart.cartItems.length}
        className="soppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
      >
        <div
          style={{ maxWidth: "1000px", margin: "auto", padding: "20px 0px" }}
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
                    <Card key={cartItem.image} style={{ height: "20" }}>
                      <Row justify="space-between" align="middle">
                        <Col span={6}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.productName}
                            width={80}
                          />
                          <div>
                            <Typography.Text strong>{cartItem.productName}</Typography.Text>
                            <Typography.Text>{cartItem.desc}</Typography.Text>
                            <Button
                              type="link"
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              Remove
                            </Button>
                          </div>
                        </Col>
                        <Col span={4}>
                          <Typography.Text strong>${cartItem.productPrice}</Typography.Text>
                        </Col>
                        <Col span={6}>
                          <div className="cart-product-quantity">
                            <Flex justify="center" align="center">
                              <button
                                className="count-button"
                                onClick={() => handleDecreaseCart(cartItem)}
                              >
                                -
                              </button>
                              <div className="count">
                                {cartItem.cartQuantity}
                              </div>
                              <button
                                className="count-button"
                                onClick={() => handleIncreaseCart(cartItem)}
                              >
                                +
                              </button>
                            </Flex>
                          </div>
                        </Col>
                        <Col span={4}>
                          <Typography.Text strong>
                            ${cartItem.productPrice * cartItem.cartQuantity}
                          </Typography.Text>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
              </Row>
              <div className="cart-summary">
                <Button
                  onClick={() => handleClearCart()}
                  type="link"
                  icon={<LeftOutlined />}
                >
                  Clear Cart
                </Button>
                <div className="cart-checkout">
                  <div className="subtotal">
                    <Typography.Text strong>Subtotal:</Typography.Text>
                    <Typography.Text strong>${cart?.cartTotalAmount}</Typography.Text>
                  </div>
                  <Typography.Text type="secondary">
                    Taxes and shipping calculated at checkout.
                  </Typography.Text>
                  <Link to="/auth/user-checkout">
                    <Button onClick={()=>setCartDrawerOpen(false)} type="dashed">Checkout</Button>
                  </Link>
                  <div className="continue-shopping">
                    <Link to="/auth/shop">
                      <Button type="default" icon={<LeftOutlined />}>
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



