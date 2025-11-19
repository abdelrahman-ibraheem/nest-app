import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mongoose, Types } from 'mongoose';
import { type IOrder, orderStatusEnum, paymentMethodEnum } from 'src/types/order.types';
import { User } from './user.model';

@Schema({
  timestamps: true,
})
export class Order implements IOrder {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  user: Types.ObjectId;

  @Prop({
    type:Types.ObjectId,
required:true,
    ref: User.name,
})
  items: { product: Types.ObjectId; quantity: number }[];

 subtotal: number;

  @Prop({
    type: Number,
    default: 0,
  })
  discount: number;

  @Prop({
    type: Number,
    required: true,
  })
  total: number;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: String,
    required: true,
  })
  instructions: string[];

  phone: string;

  @Prop({
    type: String,
    enum: Object.values(paymentMethodEnum),
    default: paymentMethodEnum.CASH,
  })
  paymentMethod: paymentMethodEnum;

  @Prop({})
  orderStatus: orderStatusEnum = orderStatusEnum.PENDING;
    @Prop({ type: Types.ObjectId, ref: 'product', required: true })
  product: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, default: 1 })
  quantity:Types.ObjectId;
}   
const OrderSchema = SchemaFactory.createForClass(Order);
export const OrderModel = MongooseModule.forFeature([{
    name: Order.name, schema: OrderSchema,
}]);