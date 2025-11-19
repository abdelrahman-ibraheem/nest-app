import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import slugify from 'slugify';  
@Schema({
    timestamps: true,
})
export class cart {
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
        type:  Types.ObjectId,
    })
    userId: Types.ObjectId;

         @Prop({    
        type: [Types.ObjectId],
        ref: 'product',
        default: [],
    })
      @Prop({ type: Types.ObjectId, ref: 'product', required: true })
  product: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, default: 1 })
  quantity:Types.ObjectId;
items: { product: Types.ObjectId; quantity: number }[];

}
const CartSchema= SchemaFactory.createForClass(cart);

CartSchema.pre('save', function (next) {
    this.slug=slugify(this.name,{
lower:true,
    })
    next();
})
export const cartModel = mongoose.model(cart.name, CartSchema);