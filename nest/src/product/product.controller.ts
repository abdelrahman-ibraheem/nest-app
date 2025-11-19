import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { productService } from "./product.services";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/comoon/utils/multer";
import { type IProduct } from "src/types/product.types";
import { Multer } from "multer";
     interface AuthRequest extends Request {
      user: { id: string };
    }
 @Controller('product')
 
export class productController {

    constructor(private readonly productService: productService ) {}
    @Post( '/create')
   @UseGuards(AuthGuard)
   @UseInterceptors( FileInterceptor('images',{
      storage:multerOptions('./src/uploads/products')
  }))
    async createProduct(@Req()req:AuthRequest ,@Body() data:IProduct, @UploadedFile() images:Multer.File[]){
        data.images= images.map(file => file.path); 
        return await this.productService.createProduct(data);
    }

}
