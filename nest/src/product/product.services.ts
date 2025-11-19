import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Brand } from "src/models/brand.model";
import { Model } from "mongoose";
import { Category } from "src/models/catagory.model";
import { product } from "src/models/product.model";
import { IProduct } from "src/types/product.types";

@Injectable()
export class productService {
  constructor(
       @InjectModel(Brand.name) private brandModel: Model<Brand>, 
       @InjectModel(Category.name) private categoryModel: Model<Brand>, 
       @InjectModel(product.name) private productModel: Model<Brand>,


  ) {} 
  createProduct(data:IProduct){
    const brand = this.brandModel.findOne({ _id: data.brand });
    if (!brand) {
        throw new Error('Brand not found');
        
    }
    const category = this.categoryModel.findOne({ _id: data.category });
    if (!category) {
        throw new Error('Category not found');}



      return {
        data:product
      };

  }    
 
}