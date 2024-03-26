import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags:['review']
    }),
    createReview: builder.mutation({
      query: (reviewInfo) => ({
        url: "/reviews/create-review",
        method: "POST",
        body: reviewInfo,
      }),
      invalidatesTags: ["review","product"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product", "review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} = productApi;
