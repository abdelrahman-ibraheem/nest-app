import { Module } from "@nestjs/common";
import { cartModel } from "src/models/cart.model";
import { OrderModel } from "src/models/order.model";
import { productModel } from "src/models/product.model";
import { UserModel } from "src/models/user.model";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.services";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports:[
        OrderModel,
        cartModel,
        UserModel,
        productModel
    ],
    controllers:[OrderController],
    providers:[OrderService,JwtService],
})
export class OrderModule {}