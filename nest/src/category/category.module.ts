import { Module } from "@nestjs/common";
import { CategoryModel } from "../models/catagory.model";
import { categoryController } from "./category.controller";
import { categoryServices } from "./category.services";
import { BrandModel } from "src/models/brand.model";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports: [CategoryModel,BrandModel],
    controllers: [categoryController],
    providers: [ categoryServices,JwtService]
})
export class categoryModule {}