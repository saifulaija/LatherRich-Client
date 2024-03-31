// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from "react";
// import {
//   Button,
//   Divider,
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   message,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

// import { toast } from "react-toastify";
// import { useNavigate, useParams } from "react-router-dom";
// import CustomeDivider from "../../components/customeDivider/CustomeDivider";
// import {
//   useGetSingleProductForDetailsQuery,
//   useUpdateProductMutation,
// } from "../../redux/features/product/productApi";
// import { TProduct } from "../../types/product.type";
// import {
//   TResponse,
//   categoryOptions,
//   subCategoryOptions,
// } from "../../types/global.type";

// const UpdateProduct = () => {
//   const { id } = useParams();


//   const [form] = Form.useForm();
//   const [sizeStockFields, setSizeStockFields] = useState([
//     { size: "", stock: "" },
//   ]);
//   const navigate = useNavigate();

//   const {
//     data: product,
//     isLoading,
//     isFetching,
//   } = useGetSingleProductForDetailsQuery(id);

//   const [updateData, { isLoading: isUpdating }] = useUpdateProductMutation();

//   useEffect(() => {
//     if (product && product.data && product.data.sizeStok) {
//       setSizeStockFields(
//         product?.data?.sizeStok?.map(({ size, stock }) => ({ size, stock }))
//       );
//     }
//   }, [product]);

//   const handleSizeStockChange = (index, fieldName, value) => {
//     const newFields = [...sizeStockFields];
//     newFields[index][fieldName] = value;
//     setSizeStockFields(newFields);
//   };

//   const handleAddSizeStock = () => {
//     setSizeStockFields([...sizeStockFields, { size: "", stock: "" }]);
//   };

//   const formatSizeStock = () => {
//     const formattedSizeStock = sizeStockFields.map(({ size, stock }) => ({
//       size: size.toString(),
//       stock: parseInt(stock),
//     }));
//     return formattedSizeStock;
//   };

//   const onFinish = async (values:any) => {
//     try {
//       const formDataWithSizeStock = {
//         ...values,
//         sizeStock: formatSizeStock(),
//       };

//       const options = {
//         productId: id,
//         data: formDataWithSizeStock,
//       };

//       console.log("update data", options);

  

//       try {
//         const res = (await updateData(options)) as TResponse<TProduct>;

//         if (res?.error) {
//           toast.error(res?.error?.data?.message);
//         } else {
//           toast.success("Product updated successfully");
//           navigate("/superAdmin/show-product");
//         }
//       } catch (error) {
//         toast.error("Something went wrong");
//       }
//     } catch (error) {
//       console.error("Failed to update product:", error);
//       message.error("Failed to update product. Please try again later.");
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-3xl border border-neutral-400 pl-20">
//       <CustomeDivider title="Update product" />
//       <Form
//         form={form}
//         name="register"
//         labelCol={{ span: 12 }}
//         wrapperCol={{ span: 20 }}
//         onFinish={onFinish}
//         layout="vertical"
//       >
//         <Form.Item
//           name="name"
//           initialValue={product?.name}
//           rules={[{ required: true }]}
//         >
//           <Input
//             placeholder="Product name...."
//             defaultValue={product?.data.name}
//             className="font-bold p-1 text-gray-600"
//             style={{ width: "100%" }}
//           />
//         </Form.Item>
//         <Form.Item
//           name="price"
//           initialValue={product?.price}
//           rules={[{ required: true }]}
//         >
//           <InputNumber
//             style={{ width: "100%" }}
//             defaultValue={product?.data?.price}
//             placeholder="Product price.... "
//             className="font-bold  text-gray-600"
//           />
//         </Form.Item>
//         <Form.Item
//           name="category"
//           initialValue={product?.category}
//           rules={[{ required: true }]}
//         >
//           <Select
//             className="font-bold  text-gray-600"
//             defaultValue={product?.data?.category}
//             placeholder="Select category"
//             options={categoryOptions}
//           />
//         </Form.Item>
//         <Form.Item
//           name="subCategory"
//           initialValue={product?.subCategory}
//           rules={[{ required: true }]}
//         >
//           <Select
//             className="font-bold  text-gray-600"
//             defaultValue={product?.data?.subCategory}
//             placeholder="Select sub category"
//             options={subCategoryOptions}
//           />
//         </Form.Item>
//         <Form.Item
//           name="model"
//           initialValue={product?.model}
//           rules={[{ required: true }]}
//         >
//           <Input
//             style={{ width: "100%" }}
//             defaultValue={product?.data?.model}
//             className="font-bold p-1 text-gray-600"
//             placeholder="Product model.... "
//           />
//         </Form.Item>
//         <Form.Item
//           name="material"
//           initialValue={product?.material}
//           rules={[{ required: true }]}
//         >
//           <Input
//             style={{ width: "100%" }}
//             defaultValue={product?.data?.material}
//             className="font-bold p-1 text-gray-600"
//             placeholder="Product material.... "
//           />
//         </Form.Item>
//         <Form.Item
//           name="tag"
//           initialValue={product?.tag}
//           rules={[{ required: true }]}
//         >
//           <Input
//             style={{ width: "100%" }}
//             defaultValue={product?.data?.tag}
//             className="font-bold p-1 text-gray-600"
//             placeholder="Product tag.... "
//           />
//         </Form.Item>

//         <Form.Item
//           name="discount"
//           initialValue={product?.discount}
//           rules={[{ required: true }]}
//         >
//           <InputNumber
//             style={{ width: "100%" }}
//             defaultValue={product?.data?.discount}
//             placeholder="Product discount.... "
//             className="font-bold p-1 text-gray-600"
//           />
//         </Form.Item>
//         <Form.Item
//           name="description"
//           initialValue={product?.description}
//           rules={[
//             { required: true, message: "Please input product description!" },
//           ]}
//         >
//           <Input.TextArea
//             placeholder="Enter product description"
//             defaultValue={product?.data?.description}
//             autoSize={{ minRows: 3, maxRows: 6 }}
//           />
//         </Form.Item>

//         <Form.Item>
//           <Divider>Size & Stock</Divider>
//           {sizeStockFields.map((field, index) => (
//             <div key={index} style={{ display: "flex", marginBottom: 8 }}>
//               <Form.Item style={{ marginRight: 8 }}>
//                 <Input
//                   style={{ width: "100%" }}
//                   defaultValue={product?.data?.sizeStok[index]?.size}
//                   placeholder="Size"
//                   value={field.size}
//                   onChange={(e) =>
//                     handleSizeStockChange(index, "size", e.target.value)
//                   }
//                 />
//               </Form.Item>
//               <Form.Item style={{ marginRight: 8 }}>
//                 <InputNumber
//                   style={{ width: "100%" }}
//                   placeholder="Stock"
//                   defaultValue={product?.data?.sizeStok[index]?.stock}
//                   value={field.stock}
//                   onChange={(value) =>
//                     handleSizeStockChange(index, "stock", value)
//                   }
//                 />
//               </Form.Item>
//               <Button
//                 type="link"
//                 danger
//                 onClick={() =>
//                   setSizeStockFields(
//                     sizeStockFields.filter((_, idx) => idx !== index)
//                   )
//                 }
//               >
//                 Remove
//               </Button>
//             </div>
//           ))}
//           <Button block onClick={handleAddSizeStock}>
//             Add Size & Stock
//           </Button>
//         </Form.Item>

//         <Form.Item
//           wrapperCol={{ span: 20 }}
//           style={{ marginBottom: 8, marginTop: "20px" }}
//         >
//           <Button
//             icon={<PlusOutlined />}
//             className="border-none bg-orange-500 border-teal-600 text-teal-700 uppercase tracking-wider font-semibold"
//             htmlType="submit"
//             block
//             loading={isUpdating}
//           >
//             Update Product Now
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default UpdateProduct;
