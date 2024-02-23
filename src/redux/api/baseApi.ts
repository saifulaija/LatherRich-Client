/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
  import { logout, setUser } from "../features/auth/authSlice";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  });
  
  const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
  > = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error?.status === 401) {
      console.log("sending refresh token");
      const res = await fetch("http://localhost:3000/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
  
      if (data?.data?.accessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            token: data.data.accessToken,
          })
        );
  
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    }
  
    return result;
  };
  
  export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithRefreshToken,
  
    tagTypes: ["product", "user", "sell", "order","branch"],
    endpoints: () => ({}),
  });
  