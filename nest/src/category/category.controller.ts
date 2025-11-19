import { Body, Controller, Get, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { categoryServices } from "./category.services";
import { type ICategory } from "src/types/category.types";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/comoon/utils/multer";
import { Multer } from "multer";
import { Request } from "express";  
import { AuthGuard } from "@nestjs/passport";
interface AuthRequest extends Request {
  user: { id: string };
}

@Controller('category')

export class categoryController {
 constructor(private readonly categoryService:categoryServices) {}
 @Post ('create')
 @UseGuards(AuthGuard)
 @UseInterceptors( FileInterceptor('image',{
    storage:multerOptions('./src/uploads/category')
}))
 async create( @Req()req:AuthRequest ,@Body() data:ICategory, @UploadedFile() image:Multer.File){
    data.image= image.path;
 
    return await this.categoryService.createCategory(data);
 } 
 
 @Patch('update/:id')
 @UseGuards(AuthGuard)
 @UseInterceptors( FileInterceptor('image',{
    storage:multerOptions('./src/uploads/category')
}))
 async UpdateCategory( @Req()req:AuthRequest ,@Body() data:ICategory,@UploadedFile() image:Multer.File,@Param('id') categoryId){
if (image) {
    data.image= image.path;
    
}  
    return await this.categoryService.UpdateCategory(categoryId,data);
 }
 @Get('all')
    async findAll(){
    return await this.categoryService.findAll();
    }
}