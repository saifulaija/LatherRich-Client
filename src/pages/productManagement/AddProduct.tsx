/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,

  Divider,
  Form,
  Input,
  InputNumber,
  Select,
 
  Upload,
  message,
} from "antd";

import {  PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { TResponse, categoryOptions, subCategoryOptions } from "../../types/global.type";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.type";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { IoCloseOutline } from "react-icons/io5";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";

const AddProduct = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [sizeStockFields, setSizeStockFields] = useState([
    { size: "", stock: "" },
  ]);
  const navigate= useNavigate();
 

  const [productCreate, { isLoading }] = useCreateProductMutation();
  const handleSizeStockChange = (index, fieldName, value) => {
    const newFields = [...sizeStockFields];
    newFields[index][fieldName] = value;
    setSizeStockFields(newFields);
  };

  const handleAddSizeStock = () => {
    setSizeStockFields([...sizeStockFields, { size: "", stock: "" }]);
  };

  const formatSizeStok = () => {
    const formattedSizeStok = sizeStockFields.map(({ size, stock }) => ({
      size: size.toString(),
      stock: parseInt(stock),
    }));
    return formattedSizeStok;
  };
 

  const onFinish = async (values:any) => {
    try {
      const uploadedImages = await Promise.all(fileList.map(uploadImage));
      const formDataWithSizeStok  = {
        ...values,
        sizeStok: formatSizeStok(),
        images: uploadedImages,
      };

      const productInfo = {
        name: values.name,
        price: values.price,
        model: values.model,
        category: values.category,
        subCategory: values.subCategory,
        material: values.material,
        images: uploadedImages,
        sizeStok: formatSizeStok(),
        tag: values.tag,
        productType:values.productType,
        discount: values.discount,
        description: values.description,
        productCode:values.productCode
      };
     

      try {
        console.log(productInfo);
  
        const res = (await productCreate(productInfo)) as TResponse<TProduct>;
  
        if (res?.error) {
          toast.error(res?.error?.data?.message);
        } else {
          toast.success("product  created successfully");
          navigate('/superAdmin/show-product');
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    } catch (error) {
      console.error("Failed to add user:", error);
      message.error("Failed to add user. Please try again later.");
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      setError("You can only upload JPG/PNG file!");
      return false;
    }

    if (!isLt2M) {
      setError("Image must smaller than 2MB!");
      return false;
    }

    setFileList([...fileList, file]);
    setError(null);
    return false;
  };

  const handleRemove = (file: any) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "9afc585cc916e23b2756a9946d82ec0e");
    const imageResponse = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );
    return imageResponse.data.data.url;
  };

  return (
    <div className="container mx-auto max-w-3xl border border-neutral-400 pl-20">
   <CustomeDivider title='Add product'/>
      <Form
        form={form}
        name="register"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            placeholder="Product name...."
            className="font-bold p-1 text-gray-600"
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="productType" rules={[{ required: true }]}>
          <Input
            placeholder="Product type...."
            className="font-bold p-1 text-gray-600"
            disabled={isLoading}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item name="productCode" rules={[{ required: true }]}>
          <Input
            placeholder="Product code...."
            className="font-bold p-1 text-gray-600"
            disabled={isLoading}
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
            <div className="max-w-full" key={index} style={{ display: "flex", marginBottom: 8 }}>
              <Form.Item style={{ marginRight: 8 }}>
                <Input
                  style={{ width: "100%" }}
                  className="font-bold p-1 text-gray-600"
                  placeholder="Size"
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
                  value={field.stock}
                  onChange={(value) =>
                    handleSizeStockChange(index, "stock", value)
                  }
                />
              </Form.Item>
              <Button
                type="link"
                icon={<IoCloseOutline className="text-[18px] font-semibold" />}
                danger
                onClick={() =>
                  setSizeStockFields(
                    sizeStockFields.filter((_, idx) => idx !== index)
                  )
                }
              >
               
              </Button>
            </div>
          ))}
          <Button block  className="border border-neutral-500 text-neutral-600 uppercase tracking-wider font-semibold" type="dashed"  icon={<PlusOutlined />} onClick={handleAddSizeStock}>
            Add Size & Stock
          </Button>
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
          validateStatus={error ? "error" : undefined}
          help={error}
        >
          <Upload
            accept=".jpg, .png"
            listType="picture"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onRemove={handleRemove}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 20 }}
          style={{ marginBottom: 8, marginTop: "20px" }}
        >
          <Button
            icon={<PlusOutlined />}
            className="border border-teal-600 text-teal-700 uppercase tracking-wider font-semibold"
            htmlType="submit"
            block
            loading={isLoading}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
