import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { cart } from "src/models/cart.model";
import { product } from "src/models/product.model";
import { Model, Types } from "mongoose";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(cart.name) private readonly cartModel: Model<cart>,
    @InjectModel(product.name) private readonly productModel: Model<product>,
  ) {}

  async GetCart(userId: Types.ObjectId) {
    let userCart = await this.cartModel
      .findOne({ createdBy: userId })
      .populate([{ path: "items" }]);

    // Create new cart if not found
    if (!userCart) {
      userCart = await this.cartModel.create({
        items: [],
        createdBy: userId,
      });
    }

    return { data: userCart };
  }
    async addToCart({
    product,
    userId,
    quantity,
  }: {  
    product: Types.ObjectId;
    userId: Types.ObjectId;
    quantity: number;
  }) {
    const isProductExist = await this.cartModel.findOne({_id:product,stock:{$gte:quantity}}); ;
    if (!isProductExist) {
   throw new Error("Product not found or insufficient stock");
    }
    let cart = await this.cartModel.findOne({ user: userId });
    if (!cart) {
      cart = await this.cartModel.create({
        user: userId,
        items: [{
            product,
            quantity
        }],
      });
        return { data: cart };
    }
     
    
    isProductExist.items.push(product as unknown as any);
    await isProductExist.save();
    return { data: isProductExist };

    }

  async removeFromCart({
    product,
    userId,
  }: {
    product: Types.ObjectId;
    userId: Types.ObjectId;
  }) {
    const userCart = await this.cartModel.findOne({ createdBy: userId });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    const index = userCart.items.findIndex(
      (item: any) => item.toString() === product.toString(),
    );

    if (index === -1) {
      throw new Error("Product not found in cart");
    }

    // remove 1 item from cart
    userCart.items.splice(index, 1);

    await userCart.save();

    return { data: userCart };
  }
}
