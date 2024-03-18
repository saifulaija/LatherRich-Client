/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  Button,
  Table,
  
  Space,
  message,
  Pagination,
  Select,
  Flex,
  Spin,
} from "antd";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
  
  
} from "../../redux/features/product/productApi";

import { Link } from "react-router-dom";
import {
  TQueryParam,
  categoryOptions,
  sortOptions,
  subCategoryOptions,
} from "../../types/global.type";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import { IoMdClose } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";



const ShowProduct = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([{ name: "page", value: page }, ...params]);

  const metaData = productData?.meta;

  const [deleteProduct] = useDeleteProductMutation();






  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      await deleteProduct(id);
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  



 



 

  const handleCategoryFilter = (value: string | null) => {
    setSelectedCategory(value || "");

    if (value === null) {
      setParams((prevParams) =>
        prevParams.filter((param) => param.name !== "category")
      );
    } else {
      setParams((prevParams) => {
        const existingCategoryParam = prevParams.find(
          (param) => param.name === "category"
        );

        if (existingCategoryParam) {
          return prevParams.map((param) =>
            param.name === "category" ? { ...param, value } : param
          );
        } else {
          return [...prevParams, { name: "category", value }];
        }
      });
    }
  };
  const handleSubCategoryFilter = (value: string | null) => {
    setSelectedSubCategory(value || "");

    if (value === null) {
      setParams((prevParams) =>
        prevParams.filter((param) => param.name !== "subCategory")
      );
    } else {
      setParams((prevParams) => {
        const existingCategoryParam = prevParams.find(
          (param) => param.name === "subCategory"
        );

        if (existingCategoryParam) {
          return prevParams.map((param) =>
            param.name === "subCategory" ? { ...param, value } : param
          );
        } else {
          return [...prevParams, { name: "subCategory", value }];
        }
      });
    }
  };

  const handleSort = (value: string) => {
    setSelectedSort(value);
    setParams((prevParams) => {
      const filteredParams = prevParams.filter(
        (param) => param.name !== "sort"
      );
      return [...filteredParams, { name: "sort", value }];
    });
  };


  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (images: string) => (
        <img
          className="rounded-md"
          src={images[0]}
          alt="Product"
          style={{ maxWidth: "70%", maxHeight: "50px" }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      width: 100,
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
      width: 100,
    },
    {
      title: "sub Category",
      dataIndex: "subCategory",
      key: "sportType",
      width: 100,
    },

    {
      title: "Action",
      key: "operation",
      width: 100,
      render: (_: any, record: any) => (
        <Space size="small">
          <Link to={`/superAdmin/duplicate-product/${record?._id}`}>
            <Button icon={<FaRegEdit />}></Button>
          </Link>
         
          <Button icon={<IoMdClose />} onClick={() => handleDelete(record._id)}></Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <CustomeDivider title={"all product's"} />

      <div className="max-w-[800px] container mx-auto md:flex justify-center items-center gap-8 mb-5">
        <div className="">
          <label
            htmlFor="category-select"
            className="text-[14px] tracking-wider font-semibold text-gray-500 uppercase"
          >
            Filter by Category:
          </label>
          <Select
            id="category-select"
            placeholder="Select category"
            value={selectedCategory || undefined}
            onChange={handleCategoryFilter}
            options={categoryOptions}
            style={{ width: "100%" }}
          ></Select>
        </div>

        <div>
          <label
            htmlFor="subCategory-select"
            className="text-[14px] tracking-wider font-semibold text-gray-500 uppercase"
          >
            Filter by subCategory:
          </label>
          <Select
            id="subCategory-select"
            placeholder="Select sub category"
            value={selectedSubCategory || undefined}
            onChange={handleSubCategoryFilter}
            options={subCategoryOptions}
            style={{ width: "100%" }}
          ></Select>
        </div>

        <div className="">
          <label
            htmlFor="sort-select"
            className="text-[14px] tracking-wider font-semibold text-gray-500 uppercase"
          >
            Sort By Price:
          </label>
          <Select
            id="sort-select"
            placeholder="Sort BY Price"
            value={selectedSort || undefined}
            onChange={handleSort}
            options={sortOptions}
            style={{ width: "100%" }}
          ></Select>
        </div>
      </div>

      {isLoading ? (
        <Spin spinning={isLoading && isFetching} />
      ) : (
        <Table
          columns={columns}
          dataSource={productData?.data}
          scroll={{ x: 1000 }}
          loading={isFetching}
          pagination={false}
          rowKey="_id"
          bordered
        />
      )}
      
      <Flex justify="center" align="center" style={{ marginTop: "30px" }}>
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </Flex>
    </div>
  );
};

export default ShowProduct;
