import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, autoIndex: false })
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
  password: string; // <-- Ensure this exists

  @Prop({ default: 'assets/images/default-profile-picture.png' })
  profilePicture: string;

  @Prop({ required: true })
  matiere: string;

  @Prop({ default: false })
  isPaid: boolean;
}

export type TeacherDocument = Teacher & Document & { _id: string };
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
