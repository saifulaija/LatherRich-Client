import { baseApi } from "../../api/baseApi";

 const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/order/create-order",
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
          url: `/order/get-single-order/${id}`,
          method: "GET",
        };
      },
    }),
   

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
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
  useUpdateOrderDeliveryMutation
} = orderApi;
