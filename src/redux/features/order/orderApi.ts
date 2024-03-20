import { baseApi } from "../../api/baseApi";

 const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders/create-order",
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["order"],
    }),
    createPaymentSSL: builder.mutation({
      query: (paymentInfo) => ({
        url: "/order/payment-ssl",
        method: "POST",
        body: paymentInfo,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrderDelivery: builder.mutation({
      query: (orderData) => {
        console.log("order", orderData);
        return {
          url: `/orders/update-delivery/${orderData.id}`,
          method: "PATCH",
          body: orderData.data,
        };
      },
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: '/orders',
        method: "GET",
      }),

      providesTags: ["order"],
    }),
   


    getSingleOrder: builder.query({
      query: (id) => {
        console.log("success", id);
        return {
          url: `/orders/get-single-order/${id}`,
          method: "GET",
        };
      },
    }),
    getSingleOrderByOrderNumber: builder.query({
      query: (id) => {
        console.log("success", id);
        return {
          url: `/orders/success-order/${id}`,
          method: "GET",
        };
      },
    }),
   

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useCreatePaymentSSLMutation,
  useUpdateOrderDeliveryMutation,
 useGetSingleOrderByOrderNumberQuery
} = orderApi;
