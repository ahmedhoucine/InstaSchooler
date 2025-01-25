import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Student extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
  classe: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: String, required: true })
  parentEmail: string;

  @Prop({ type: String, required: true })
  parentPhone: string;

  @Prop({ type: String, required: true })
  dateOfBirth: string;

  @Prop({ type: String, required: false })
  username: string;

  @Prop({ type: Number, required: true })
  niveau: number;


  @Prop({ type: String, required: true })
  nationality: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ type: String, required: true })
  admissionNo: string;

  @Prop({ type: Date, required: true })
  joiningDate: Date;

  @Prop({ type: String, required: true })
  rollNo: string;

  @Prop({ type: String, required: true })
  parentFirstName: string;

  @Prop({ type: String, required: true })
  parentLastName: string;

  @Prop({ type: String, required: true })
  relation: string;

  @Prop({ type: String, required: true })
  parentMobileNo: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  parentAddress: string;

  @Prop({ type: String })
  status: string;
  
}

export const StudentSchema = SchemaFactory.createForClass(Student);
