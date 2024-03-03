

import { baseApi } from "../../api/baseApi";

 const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        console.log("auth", userInfo);
        return {
          url: "/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
