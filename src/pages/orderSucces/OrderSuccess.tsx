import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../redux/features/order/orderApi";
import { Button, Spin } from "antd";
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderPdf from "../../components/orderPdf/OrderPdf";


const OrderSuccess = () => {
    const { id } = useParams();
    const { data: orderData, isLoading } = useGetSingleOrderQuery(id);

    if (isLoading) {
        return <Spin />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Congratulations! Your Order is Successful</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Order Number:</h2>
                        <p className="text-gray-800">{orderData.orderNumber}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Order Date:</h2>
                        <p className="text-gray-800">{new Date(orderData.orderDate).toLocaleString()}</p>
                    </div>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Buyer Information:</h2>
                    <p className="text-gray-800">
                        <span className="font-semibold">Name:</span> {orderData.buyerName}<br />
                        <span className="font-semibold">Email:</span> {orderData.buyerEmail}<br />
                        <span className="font-semibold">Mobile:</span> {orderData.mobile}
                    </p>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Delivery Address:</h2>
                    <p className="text-gray-800">{orderData.address}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Delivery Status:</h2>
                    <p className="text-gray-800">{orderData.deliveryStatus}</p>
                </div>
            </div>
            <div className="mt-8 text-center">
                <PDFDownloadLink document={<OrderPdf orderData={orderData} />} fileName={`order_${orderData.orderNumber}.pdf`}>
                    {({ blob, url, loading, error }) => (
                        <Button  loading={loading}>
                            {loading ? 'Generating PDF...' : 'Download PDF'}
                        </Button>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
};

export default OrderSuccess;
