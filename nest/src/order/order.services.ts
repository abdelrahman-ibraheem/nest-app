import { Injectable, NotFoundException } from "@nestjs/common";
import { cart } from "src/models/cart.model";
import { Order } from "src/models/order.model";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IProduct } from "src/types/product.types";
import { product } from "src/models/product.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(cart.name)private readonly cartModel: Model<cart>,
    @InjectModel(Order.name)private readonly orderModel: Model<Order>,
    @InjectModel(product.name)private readonly productModel: Model<IProduct>,
  ) {}

  async createOrder({
    userId,
    discount,
    instructions,
    address,
    phone,
    paymentMethod,
    totalPrice
    
  }: {
    userId: Types.ObjectId;
    discount?: number;
    instructions?: string[];
    address: string;
    phone: string;
    paymentMethod?: string;
    totalPrice: number;
  }) {
    const Cart = await this.cartModel.findOne({ createdBy: userId });

    if (!Cart) {
      throw new NotFoundException("Cart not found");
    }

   
    const subtotal = Cart.items.reduce((totalPrice,item)=>totalPrice+((item.product as unknown as IProduct).salePrice),0)
    const total = subtotal - (discount || 0);
    for (const item of Cart.items) {
    await this.productModel.updateOne({ _id: item.product  }, {
        stock: { $inc: -item.quantity },
    })
}

const order = await this.orderModel.create({
    address,
    discount,
    instructions,
    phone,
    paymentMethod,
    user: userId,
    items: Cart.items,

})
    return{data:{
        subtotal,
        discount,
        total,
    }}

  }
}
