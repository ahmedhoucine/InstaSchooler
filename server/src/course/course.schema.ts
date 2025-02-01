import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  niveau: string;

  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: false, type: String, default: null }) // Déclarez explicitement le type
  pdf?: string | null;

  @Prop({ required: false, type: String }) // Optionnel
  image?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  students: Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
