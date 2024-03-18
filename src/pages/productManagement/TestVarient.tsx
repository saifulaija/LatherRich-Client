/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import {
  useGetSingleProductForDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.type";
import {
  TResponse,
  categoryOptions,
  subCategoryOptions,
} from "../../types/global.type";
import { IoCloseCircleOutline } from "react-icons/io5";

const UpdateProduct = () => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const [sizeStockFields, setSizeStockFields] = useState([
    { size: "", stock: "" },
  ]);
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isFetching,
  } = useGetSingleProductForDetailsQuery(id);

  const [updateData, { isLoading: isUpdating }] = useUpdateProductMutation();
  //test--------
  const handleAddSizeStock = () => {
    setSizeStockFields([...sizeStockFields, { size: "", stock: "" }]);
  };

  useEffect(() => {
    if (product && product.data && product.data.sizeStok) {
      setSizeStockFields(
        product?.data?.sizeStok?.map(({ size, stock } :{size:string, stock:number}) => ({ size, stock }))
      );
    }
  }, [product]);

 
  // const handleSizeStockChange = (
  //   index: number,
  //   fieldName: string,
  //   value: any
  // ) => {
  //   const newFields = [...sizeStockFields];
  //   newFields[index][fieldName]  = value;
  //   setSizeStockFields(newFields);
  // };



  const handleSizeStockChange = (
    index: number,
    fieldName: "size" | "stock", 
    value: string 
  ) => {
    const newFields = [...sizeStockFields];
    newFields[index][fieldName] = value;
    setSizeStockFields(newFields);
  };
  

  const formatSizeStock = () => {
    const formattedSizeStock = sizeStockFields.map(({ size, stock }) => ({
      size: size.toString(),
      stock: parseInt(stock),
    }));
    return formattedSizeStock;
  };

  const onFinish = async (values : TProduct) => {
    try {
      const formDataWithSizeStock = {
        ...values,
        sizeStok: formatSizeStock(),
      };

      const options = {
        productId: id,
        data: formDataWithSizeStock,
      };

      console.log("update data", options);

      try {
        const res = (await updateData(options)) as TResponse<TProduct>;

        if (res?.error) {
          toast.error(res?.error?.data?.message);
        } else {
          toast.success("Product updated successfully");
          navigate("/superAdmin/show-product");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      message.error("Failed to update product. Please try again later.");
    }
  };

  return (
    <Spin spinning={isLoading && isFetching}>
      <div className="container mx-auto max-w-3xl border border-neutral-400 pl-20">
        <CustomeDivider title="Update product" />
        <Form
          form={form}
          name="register"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          layout="vertical"
          initialValues={product ? product.data : {}}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              placeholder="Product name...."
              className="font-bold p-1 text-gray-600"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item name="price" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Product price.... "
              className="font-bold  text-gray-600"
            />
          </Form.Item>
          <Form.Item name="category" rules={[{ required: true }]}>
            <Select
              className="font-bold  text-gray-600"
              placeholder="Select category"
              options={categoryOptions}
            />
          </Form.Item>
          <Form.Item name="subCategory" rules={[{ required: true }]}>
            <Select
              className="font-bold  text-gray-600"
              placeholder="Select sub category"
              options={subCategoryOptions}
            />
          </Form.Item>
          <Form.Item name="model" rules={[{ required: true }]}>
            <Input
              style={{ width: "100%" }}
              className="font-bold p-1 text-gray-600"
              placeholder="Product model.... "
            />
          </Form.Item>
          <Form.Item name="material" rules={[{ required: true }]}>
            <Input
              style={{ width: "100%" }}
              className="font-bold p-1 text-gray-600"
              placeholder="Product material.... "
            />
          </Form.Item>
          <Form.Item name="tag" rules={[{ required: true }]}>
            <Input
              style={{ width: "100%" }}
              className="font-bold p-1 text-gray-600"
              placeholder="Product tag.... "
            />
          </Form.Item>

          <Form.Item name="discount" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Product discount.... "
              className="font-bold p-1 text-gray-600"
            />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input product description!" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter product description"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item>
            <Divider>Size & Stok</Divider>
            {sizeStockFields.map((field, index) => (
              <div
                className="max-w-full"
                key={index}
                style={{ display: "flex", marginBottom: 8 }}
              >
                <Form.Item style={{ marginRight: 8 }}>
                  <Input
                    style={{ width: "100%" }}
                    className="font-bold p-1 text-gray-600"
                    placeholder="Size"
                    defaultValue={product?.data?.sizeStok[index]?.size}
                    value={field.size}
                    onChange={(e) =>
                      handleSizeStockChange(index, "size", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item style={{ marginRight: 8 }}>
                  <InputNumber
                    style={{ width: "100%" }}
                    className="font-bold p-1 text-gray-600"
                    placeholder="Stock"
                    defaultValue={product?.data?.sizeStok[index]?.stock}
                    value={field.stock}
                    onChange={(value) =>
                      handleSizeStockChange(index, "stock", value)
                    }
                  />
                </Form.Item>
                <Button
                  type="link"
                  icon={
                    <IoCloseCircleOutline className="text-[18px] font-semibold" />
                  }
                  danger
                  onClick={() =>
                    setSizeStockFields(
                      sizeStockFields.filter((_, idx) => idx !== index)
                    )
                  }
                ></Button>
              </div>
            ))}
            <Button
              block
              className="border border-neutral-500 text-neutral-600 uppercase tracking-wider font-semibold"
              type="dashed"
              icon={<PlusOutlined />}
              onClick={handleAddSizeStock}
            >
              Add Size & Stock
            </Button>
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 20 }}
            style={{ marginBottom: 8, marginTop: "20px" }}
          >
            <Button
              icon={<PlusOutlined />}
              className="  border-indigo-600 text-neutral-700 uppercase tracking-wider font-semibold"
              htmlType="submit"
              block
              loading={isUpdating}
            >
              Update Product Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default UpdateProduct;
