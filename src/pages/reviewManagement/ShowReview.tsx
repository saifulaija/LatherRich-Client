import { Table, Button, Space } from "antd";
import CustomeDivider from "../../components/customeDivider/CustomeDivider";
import { useDeleteReviewMutation, useGetReviewsQuery } from "../../redux/features/review/reviewApi";
import { TReview } from "../../types/review.types";
import { toast } from "sonner";

const ShowReview = () => {
  const { data: reviews, isLoading, isFetching } = useGetReviewsQuery("");
    const [deleteReview] = useDeleteReviewMutation();
  const reviewsData = reviews?.data;

  const handleDelete = async (id:string) => {
    try {
        await deleteReview(id).unwrap();
        toast.warning('review deleted successfully')
         
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Review",
      dataIndex: "description",
      key: "description",
      render: (text: string) => (
        <p className="text-balance" style={{ color: "blue" }}>
          {text}
        </p>
      ), // Example style: blue color
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: TReview) => (
        <Space size="middle">
          <Button loading={isLoading && isFetching} danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <CustomeDivider title="All Reviews" />
      <Table
        columns={columns}
        dataSource={reviewsData}
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default ShowReview;
