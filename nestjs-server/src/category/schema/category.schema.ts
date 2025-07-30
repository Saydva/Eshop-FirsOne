import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  imageUrl?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
