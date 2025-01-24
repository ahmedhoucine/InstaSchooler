import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Enseignant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'light' })
  theme: string;
}

export type EnseignantDocument = Enseignant & Document;
export const EnseignantSchema = SchemaFactory.createForClass(Enseignant);
