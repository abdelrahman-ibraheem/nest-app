import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import sl from 'zod/v4/locales/sl.js';
import slugify from 'slugify';  
@Schema({
    timestamps: true,
})
export class Brand {
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
        type: String,
    })
    image: string;


}
const BrandSchema= SchemaFactory.createForClass(Brand);

BrandSchema.pre('save', function (next) {
    this.slug=slugify(this.name,{
lower:true,
    })
    next();
})
export const BrandModel = mongoose.model(Brand.name, BrandSchema);