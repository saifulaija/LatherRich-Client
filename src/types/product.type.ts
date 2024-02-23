import { Key } from "antd/es/table/interface";

export type TProductSizeStok = {
    size: string;
    stok: number;
};
  
export type TProduct = {
    name: string;
    category: string;
    price: number;
    description: string;
    image: string;
    reviews?: string;
    tag?: string;
    isDeleted: boolean;
    rating?: number;
    sellsQuantity?: number;
    discount?: number;
    sizeStok: TProductSizeStok[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
} & { [x: string]: Key | null | undefined };
