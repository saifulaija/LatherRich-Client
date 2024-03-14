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

    getAllOrders: builder.query({
      query: () => ({
        url: '/order/get-all-orders/',
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
  useCreatePaymentSSLMutation
} = orderApi;
