import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ICategory } from "src/types/category.types";
import { Category } from "../models/catagory.model";
import { Model, Types } from "mongoose";
import { Brand } from "src/models/brand.model";
import * as fs from 'fs/promises';
@Injectable()
export class categoryServices {
 constructor( 
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Brand.name) private brandModel: Model<Brand>,
 ) {}

 async createCategory(data: ICategory) {
    const IsExist = await this.categoryModel.findOne({ name: data.name });
    if (IsExist) {
        throw new ConflictException('Category already exists');
    }
    if (data.brands && data.brands.length) {
        const foundBrands = await this.brandModel.find({ _id: { $in: data.brands } });
        if (foundBrands.length !== data.brands.length) {
            throw new NotFoundException('One or more brands not found');
        }        
    }
    return this.categoryModel.create(data);
 }
async UpdateCategory(categoryId:Types.ObjectId,data:ICategory){
    const category= await this.categoryModel.findById(categoryId);
    if(!category){
        throw new ConflictException('Category not found');
    }
if (data.brands&& data.brands.length) {
    const foundBrands = await this.brandModel.find({ _id: { $in: data.brands } });
    if (foundBrands.length !== data.brands.length) {
        throw new NotFoundException('One or more brands not found');
}
if (data.brands?.length) {
    category.brands = data.brands;
    
}
}    if (data.name) {
        category.name = data.name;}
        if (data.image) {
            if (category.image) {
                await fs.unlink(category.image);
                
            }
            category.image = data.image;

        }
     await category.save();
        return category;
}
async findAll(){
    const category= await this.categoryModel.find().populate([{
           path: 'brands',
           model: 'name', 
    }]);  
}

}