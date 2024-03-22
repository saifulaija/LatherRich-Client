import { Key } from "antd/es/table/interface";

export type TProductSizeStok = {
    size: string;
    stock: number;
};

export type TReviewSchema = {
    name: string;
    rating: number;
    description: string;
    isDeleted: boolean;
  };
  
export type TProduct = {
    name: string;
    category: string;
    price: number;
    description: string;
    images:[ string];
    reviews?: TReviewSchema[];
    tag?: string;
    isDeleted: boolean;
    rating?: number;
    sellsQuantity?: number;
    discount?: number;
    sizeStok: TProductSizeStok[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    _id:string
} & { [x: string]: Key | null | undefined };
