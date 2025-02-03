import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanningDocument = Planning & Document;

@Schema()
export class Planning {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  niveau: number;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;
}

export const PlanningSchema = SchemaFactory.createForClass(Planning);
