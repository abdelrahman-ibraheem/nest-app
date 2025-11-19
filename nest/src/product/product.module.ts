import { Module } from "@nestjs/common";
import { BrandModel } from "src/models/brand.model";
import { CategoryModel } from "src/models/catagory.model";
import { UserModel } from "src/models/user.model";
import { productModel } from "src/models/product.model";
import { productController } from "./product.controller";
import { JwtService } from "@nestjs/jwt";
import { productService } from "./product.services";
@Module({
    imports: [ 
        UserModel,
        CategoryModel,
        BrandModel
        ,productModel
    ],
    controllers: [productController,],
    providers: [productService,JwtService],    
})
export class productModule {}