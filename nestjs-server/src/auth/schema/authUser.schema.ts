import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class AuthUser extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: null })
  accessToken?: string;

  @Prop({ default: null })
  refreshToken?: string;

  @Prop({ default: 'user' })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthUser);
