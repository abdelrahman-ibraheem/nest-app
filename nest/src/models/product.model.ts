import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import sl from 'zod/v4/locales/sl.js';
import slugify from 'slugify';  
import { Brand } from './brand.model';
@Schema({
    timestamps: true,
})
export class product {
    @Prop({
        required: true,
        type: String,
        unique: true,
            set:function(value:string){
                this.set({slug:slugify(value)});
            return slugify(value)
        }   

    })
    name: string;
        @Prop({
        required: true,
        type: String,
        unique: true,   

    })
    slug: string;
        @Prop({
        required: true,
        type: String,
        unique: true,   

    })
    createdBy: Types.ObjectId;

    @Prop({
        required: true,
        type: [String],
    })
    images: string[];

   @Prop({
        required: true,
        type: String,
    })
    description: string;
    @Prop({
        required: true,
        type: String,
    })
    originalPrice: number;
 @Prop({
        required: true,
        type: String,
    })
    discount: number;

    @Prop({
        required: true,
        type: String,
    })
    salePrice: number;
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    })
category: Types.ObjectId;
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    })
stock: number;
    @Prop({
        required: true,
        type: Number,
    })
soldItems: number;

    @Prop({
ref : Brand.name,
        type: mongoose.Schema.Types.ObjectId,
    })
brands: Types.ObjectId;
 @Prop({
        required: true,
        type: Number,
    })
totalPrice: number;
        

}
const productSchema= SchemaFactory.createForClass(product);

productSchema.pre('save', function (next) {
    this.slug=slugify(this.name,{
lower:true,
    })
    next();
})
export const productModel = mongoose.model(product.name, productSchema);