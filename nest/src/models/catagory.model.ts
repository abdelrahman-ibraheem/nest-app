import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import sl from 'zod/v4/locales/sl.js';
import slugify from 'slugify';  
@Schema({
    timestamps: true,
})
export class Category {
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
      @Prop({
        required: true,
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Brand',
    })
brands: Array<Types.ObjectId>;

}
const CategorySchema= SchemaFactory.createForClass(Category);

CategorySchema.pre('save', function (next) {
    this.slug=slugify(this.name,{
lower:true,
    })
    next();
})
export const CategoryModel = mongoose.model(Category.name, CategorySchema);