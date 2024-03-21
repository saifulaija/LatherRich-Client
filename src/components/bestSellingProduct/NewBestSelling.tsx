// import { Card, Avatar } from "antd";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { useState } from "react";
// import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
// import { TQueryParam } from "../../types/global.type";
// import "./NewBestSelling.css";


// const { Meta } = Card;

// const NewBestSelling = () => {
//   const [params, setParams] = useState<TQueryParam[]>([]);
//   const {
//     data: productsData,
//     isLoading,
//     isFetching,
//   } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

//   return (
//     <div className="container mx-auto bg-white">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={10}
//         slidesPerView={4}
//         navigation={true}
//         autoplay={{ delay: 5000 }}
        
//         pagination={{
//             clickable: true,
//           }}
//         breakpoints={{
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 4,
//               spaceBetween: 40,
//             },
//             1024: {
//               slidesPerView: 5,
//               spaceBetween: 50,
//             },
//           }}
//       >
//         {productsData?.data?.map((product, index) => (
//           <SwiperSlide key={index}>
//             <Card
//               className="card"
//               cover={<img alt="example" src={product.images[0]} />}
//               actions={[
//                 <SettingOutlined key="setting" />,
//                 <EditOutlined key="edit" />,
//                 <EllipsisOutlined key="ellipsis" />,
//               ]}
//             >
//               <Meta
//                 avatar={<Avatar src={product?.data?.images[1]} />}
//                 title={product?.data?.name}
//                 description={product?.data?.description}
//               />
//             </Card>
//           </SwiperSlide>
//         ))}
//       </Swiper>

     
//     </div>
//   );
// };

// export default NewBestSelling;



import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import { useGetAllProductsQuery } from "../../redux/features/product/productApi";
import { TQueryParam } from "../../types/global.type";
import "./NewBestSelling.css";

const { Meta } = Card;

const NewBestSelling = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: productsData,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([{ name: "sort", value: "-price" }, ...params]);

  return (
    <div className="container mx-auto bg-white">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{ delay: 5000 }}
        navigation={true}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        
      >
        {productsData?.data?.map((product, index) => (
          <SwiperSlide key={index}>
            <Card
              className="card"
              cover={<img alt="example" src={product.images[0]} />}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar src={product?.data?.images[1]} />}
                title={product?.data?.name}
                description={product?.data?.description}
              />
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewBestSelling;

