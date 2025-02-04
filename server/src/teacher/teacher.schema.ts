import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'assets/images/default-profile-picture.png' })
  profilePicture: string;

  @Prop({ required: true })
  matiere: string;

  @Prop({ default: false })
  isPaid: boolean;
}

export type TeacherDocument = Teacher & Document & { _id: string }; // Important pour le type _id
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
