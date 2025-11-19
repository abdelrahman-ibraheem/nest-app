import { ConflictException, Injectable, NotAcceptableException } from "@nestjs/common";        
import { InjectModel } from "@nestjs/mongoose";
import { Brand } from "src/models/brand.model";
import { Model, Types } from "mongoose";
import { IBrand } from "src/types/brand.types";
import * as fs from 'fs/promises';
@Injectable()
export class BrandService {
constructor( @InjectModel(Brand.name) private brandModel:Model<Brand>) {}

async create(data:IBrand,ImagePath:string):Promise<Brand>{
      const IsExist= await this.brandModel.findOne({name:data.name});
      if(IsExist){
        throw new ConflictException('Brand already exists');
      }
      if (ImagePath) {
        data.image = ImagePath;
      }
      return this.brandModel.create(data)
    };

async UpdateBrand(brandId:Types.ObjectId,data:IBrand){
    const brand= await this.brandModel.findById(brandId);
    if(!brand){
        throw new ConflictException('Brand not found');
    }
    if (data.name) {
        brand.name = data.name;

        
    }
    if (data.image) {
        if (brand.image) {
            await fs.unlink(brand.image);
            
        }
        brand.image = data.image;
    }
    return await brand.save();

          
}
async findOne(id:Types.ObjectId){
    const brand= await this.brandModel.findOne({_id:id});
    if (!brand) {
        throw new NotAcceptableException('Brand not found');

        
    }
    return brand;

    

}
async findAll(){
    return await this.brandModel.find();

}
}
