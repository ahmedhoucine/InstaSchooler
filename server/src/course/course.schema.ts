import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Course {
  @Prop({ required: true })
  niveau: string;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
  
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ required: true })
  duration: number;

  @Prop({ default: '' })
  image: string;

  @Prop()
  pdf: string;

  @Prop({ required: true })
  teacher: string; // ID de l'enseignant
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);