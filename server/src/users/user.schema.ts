import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // ✅ Enable createdAt and updatedAt fields
export class User {
  @Prop({ type: String, required: true }) 
  name!: string;

  @Prop({ type: String, required: true, unique: true }) 
  email!: string;

  @Prop({ type: String, required: true }) 
  password!: string;

  @Prop({ type: String, default: 'user' }) 
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);;
