import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  niveau: number;

  @Prop({ default: 'Absent' })
  status: string; // Présent ou Absent
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
