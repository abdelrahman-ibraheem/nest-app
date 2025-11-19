import { Module } from "@nestjs/common";
import { BrandModel } from "src/models/brand.model";
import { BrandController } from "./brand.controller";
import { BrandService } from "./brand.service";
import { JwtService } from "@nestjs/jwt";


@Module({
    imports: [
        BrandModel,
    ],
    controllers: [
        BrandController
    ],
    providers: [BrandService,JwtService],

})
export class BrandModule {}