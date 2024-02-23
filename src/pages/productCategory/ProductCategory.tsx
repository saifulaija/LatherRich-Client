
import { useParams } from 'react-router-dom';
import { Card, Button, Space } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import { useGetAllProductsByCategoryQuery } from '../../redux/features/product/productApi';
import { TProduct } from '../../types/product.type';
import { addToCart } from '../../redux/features/cart/cartSlice';
import NoDataFoundPage from '../noDataFoundPage/NoDataFoundPage';

const { Meta } = Card;

const ProductCategory = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();

  const { data: products, isLoading, isFetching } = useGetAllProductsByCategoryQuery(category);
  console.log('data', products)

  const handleAddToCart = (product: TProduct) => {
    const res = dispatch(addToCart(product));
    console.log(res);
  };

  return (
    <>
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          {products?.data && products.data.length === 0 ? (
            <NoDataFoundPage />
          ) : (
            <Space direction="vertical" style={{ width: '100%' }}>
              {products?.data.map((product: TProduct) => (
                <Card
                  key={product._id}
                  hoverable
                  cover={<img alt={product.name} src={product.image} />}
                >
                  <Meta title={product.name} description={`Price: $${product.price}`} />
                  <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                  <div>Available Sizes:</div>
                  <Space>
                    {product.sizeStok.map((size) => (
                      <div key={size.size}>{size.size}</div>
                    ))}
                  </Space>
                </Card>
              ))}
            </Space>
          )}
        </>
      )}
    </>
  );
};

export default ProductCategory;
