import { useState } from "react";
import { Button, Card, Divider, Form, Input, Rate } from "antd";
import { TProduct } from "../../types/product.type";
import CustomeDivider from "../customeDivider/CustomeDivider";
import { UserAddOutlined } from "@ant-design/icons";
import { TReview } from "../../types/review.types";
import { useCreateReviewMutation } from "../../redux/features/review/reviewApi";
import { toast } from "sonner";
import { motion } from "framer-motion";

export type TReviewSchema = {
  name: string;
  rating: number;
  description: string;
  isDeleted: boolean;
};

const Reviews = ({ product }: { product: TProduct }) => {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [crateReview, { isLoading }] = useCreateReviewMutation();

  const toggleForm = () => {
    setShowForm(!showForm);
    form.resetFields();
  };

  const onFinish = async (values: TReview) => {
    // Add the new review to the product
    const reviewInfo = {
      name: values.name,
      rating: values.rating,
      description: values.description,
      productId: product._id,
    };

    try {
      await crateReview(reviewInfo);
      toast.success("Review added successfully");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        console.error("Unknown error:", err);
      }
    }

    toggleForm();
  };

  return (
    <motion.div
   
    initial={{ opacity:0 }}
    animate={{ opacity:1 }}
    transition={{ delay: 1.5, duration:0.9 }}
    className="containerflex justify-center items-center"
  >
      
     <div className="max-w-[800px]">
     <div className="flex justify-end items-center">
        <Button onClick={toggleForm}>Add Review</Button>
      </div>
      {showForm && (
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mt-0 bg-neutral-100 shadow-md space-y-0"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="please enter your name" />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please rate the product" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Write your's reviews......" />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} htmlType="submit">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      )}

      <CustomeDivider title="Review's"></CustomeDivider>

      <div>
        {product?.reviews?.map((review: TReviewSchema, index: number) => (
          <Card key={index} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <UserAddOutlined className="mr-2" />
                <p className="font-semibold">{review.name}</p>
              </div>
              <Rate
                disabled
                value={review.rating}
                className="text-yellow-500"
              />
            </div>
            <Divider className="mb-2" />
            <p className="text-sm">{review.description}</p>
          </Card>
        ))}
      </div>
     </div>
    </motion.div>
  );
};

export default Reviews;
