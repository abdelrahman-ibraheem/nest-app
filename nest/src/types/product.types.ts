
import { HydratedDocument, Types } from 'mongoose';
export interface IProduct {
    name: string;
    slug: string;
    createdBy: Types.ObjectId;
    images: string[];
    description: string;
    originalPrice: number;
    discount: number;
    salePrice: number;
    brands: Types.ObjectId;
    stock: number;
    soldItems: number;
    category: Types.ObjectId;
    brand: Types.ObjectId;

}
export type HydratedProduct= HydratedDocument<IProduct>