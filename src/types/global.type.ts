import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: boolean | React.Key;
};

export type TUser = {
  userName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  role: string;
};

export const categoryOptions = [
  
  { label: "Man", value: "man" },
  { label: "Women", value: "women" },
  { label: "Kid", value: "kid" },
];
export const categoryFilterOptions = [
  { label: "Clear Filter", value: null },
  { label: "Man", value: "man" },
  { label: "Women", value: "women" },
  { label: "Kid", value: "kid" },
];
export const subCategoryFilterOptions = [
  { label: "Clear Filter", value: null },
  { label: "Man-Causal", value: "man-causal" },
  { label: "Man-Formal", value: "man-formal" },
  { label: "Man-Sport", value: "man-sport" },
  { label: "Women-Causal", value: "Women-causal" },
  { label: "Women-Formal", value: "women-formal" },
  { label: "Women-Sport", value: "women-sport" },
  { label: "Kid-Causal", value: "kid-causal" },
  { label: "kid-Formal", value: "kid-formal" },
  { label: "kid-Sport", value: "kid-sport" },
];
export const subCategoryOptions = [
 
  { label: "Man-Causal", value: "man-causal" },
  { label: "Man-Formal", value: "man-formal" },
  { label: "Man-Sport", value: "man-sport" },
  { label: "Women-Causal", value: "Women-causal" },
  { label: "Women-Formal", value: "women-formal" },
  { label: "Women-Sport", value: "women-sport" },
  { label: "Kid-Causal", value: "kid-causal" },
  { label: "kid-Formal", value: "kid-formal" },
  { label: "kid-Sport", value: "kid-sport" },
];
export const sortOptions = [
  { label: "High To Low", value: "-price" },
  { label: "Low To High", value: "price" },
];
export const sizeOptions = [
  { label: "34", value: "sizeStok.size" },
  { label: "38",  value: "sizeStok.size" },
];


export const roleColors = {
  superAdmin: "geekblue",
  manager: "green",
  seller: "volcano",
  user: "gold",
};
export const deliveryColors = {
  processiong: "red",
  completed: "green",
};


export type TOrder= {
 name:string;
 orderNumber:string
}




export type TReview= {

  name: string;
  productId: string;
  description: string;
  rating: number;
 
}
export type T= {

  name: string;
  productId: string;
  description: string;
  rating: number;
 
}


