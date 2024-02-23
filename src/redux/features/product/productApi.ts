import { TQueryParam, TResponseRedux } from "../../../types/global.type";
import { TProduct } from "../../../types/product.type";

import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["product", "sell"],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/add-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["product"],
    }),

    getAllProductsByCategory: builder.query({
      query: (category) => {
        return {
          url: `/products/${category}`,
          method: "GET",
        };
      },
      providesTags: ["branch"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    updateProductNew: builder.mutation({
      query: (options) => {
        return {
          url: `/product/${options.productId}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (productId) => {
        return {
          url: `/product/${productId}`,
          method: "PUT",
        };
      },
      providesTags: ["product"],
    }),
    getSingleProductForDetails: builder.query({
      query: (productId) => {
        console.log(productId);
        return {
          url: `/get-single-product/${productId}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductNewMutation,
  useGetSingleProductQuery,
  useGetSingleProductForDetailsQuery,
  useGetAllProductsByCategoryQuery,
} = productApi;
