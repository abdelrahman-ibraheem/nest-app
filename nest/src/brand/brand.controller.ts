import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import {type IBrand } from 'src/types/brand.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import {Multer}from 'multer';
import { Request } from 'express';
import { Types } from 'mongoose';
import { multerOptions } from 'src/comoon/utils/multer';
interface AuthRequest extends Request {
  user: { id: string };
}

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/brands',
        filename: (req, file, cb) => {
          const uniqueFilename = Date.now() + '-' + file.originalname;
          cb(null, uniqueFilename);
        },
      }),
    }),
  )
  async createBrand(
    @Req() Req:AuthRequest,
    @Body() data: IBrand,
    @UploadedFile() image: Multer.File,
  ) {
data.image= image.path;
data.createdBy=Req.user.id;
    return await this.brandService.create(data, image.path);
  }
    @Patch('update/:id')
    @UseInterceptors(FileInterceptor('image',{
        storage:multerOptions('./src/uploads/brands')
    }) )
  async UpdateBrand(
    @Req() Req:AuthRequest,
    @Body() data: IBrand,
    @Param('id') brandId:Types.ObjectId,
    @UploadedFile() image: Multer.File,
  ) {
data.image= image.path;
 data.createdBy=Req.user.id;   
    return await this.brandService.UpdateBrand(brandId,data);
  }

  @Get('get/:id')
  async getBrand(@Param('id') id:Types.ObjectId) {
  if (id) {
        return await this.brandService.findOne(id);

  }
    return await this.brandService.findAll;

}}
