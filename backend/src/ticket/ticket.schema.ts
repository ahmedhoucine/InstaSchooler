import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ticket {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  urgency: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export type TicketDocument = Ticket & Document;
export const TicketSchema = SchemaFactory.createForClass(Ticket);
