import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  niveau: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: false, type: String, default: null }) // Déclarez explicitement le type
  pdf?: string | null;

  @Prop({ required: false, type: String }) // Optionnel
  image?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
