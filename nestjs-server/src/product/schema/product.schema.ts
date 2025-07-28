import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true, minlength: 3 })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  categoryId: string;
  @Prop({ required: true })
  stockQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
