import { HydratedDocument, Types } from 'mongoose';
import en from 'zod/v4/locales/en.js';

export interface IOrder {
items:Array<{
product: Types.ObjectId;
quantity: number;
}>
subtotal: number;
discount: number;
total: number;
address: string;
instructions:string[];
phone: string;
paymentMethod: string;
orderStatus: string;

}
export enum paymentMethodEnum{
    CASH='cash',
    VISA='visa',
}
export enum orderStatusEnum{
    PENDING='pending',
    PROCESSING='processing',
    SHIPPED='shipped',
    DELIVERED='delivered',
    CANCELLED='cancelled',

}
export type HOrder=HydratedDocument<IOrder>