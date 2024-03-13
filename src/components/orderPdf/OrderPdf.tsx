
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const OrderPdf = ({ orderData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.subtitle}>Order Number:</Text>
        <Text style={styles.text}>{orderData.orderNumber}</Text>
        <Text style={styles.subtitle}>Order Date:</Text>
        <Text style={styles.text}>{new Date(orderData.orderDate).toLocaleString()}</Text>
        <Text style={styles.subtitle}>Buyer Information:</Text>
        <Text style={styles.text}>Name: {orderData.buyerName}</Text>
        <Text style={styles.text}>Email: {orderData.buyerEmail}</Text>
        <Text style={styles.text}>Mobile: {orderData.mobile}</Text>
        <Text style={styles.subtitle}>Delivery Address:</Text>
        <Text style={styles.text}>{orderData.address}</Text>
        <Text style={styles.subtitle}>Delivery Status:</Text>
        <Text style={styles.text}>{orderData.deliveryStatus}</Text>
      </View>
    </Page>
  </Document>
);

export default OrderPdf;
