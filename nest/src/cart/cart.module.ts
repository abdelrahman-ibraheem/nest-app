import { cartModel } from "src/models/cart.model";
import { productModel } from "src/models/product.model";
import { UserModel } from "src/models/user.model";
import { CartService } from "./cart.services";
import { CartController } from "./cart.controller";
import { Module } from "@nestjs/common";

@Module({
    imports:[
        cartModel,
        productModel,
        UserModel


    ]
    ,controllers:[CartController],
    providers:[CartService],
})
export class CartModule {}