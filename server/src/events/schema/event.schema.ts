import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class MyEvent extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  // Ajout de la référence au Student
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  student: Types.ObjectId;
}

export const MyEventSchema = SchemaFactory.createForClass(MyEvent);
export type MyEventDocument = MyEvent & Document;
