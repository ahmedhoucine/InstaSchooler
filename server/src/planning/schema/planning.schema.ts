// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type PlanningDocument = Planning & Document;

// @Schema({ timestamps: true }) // Adds `createdAt` and `updatedAt` fields automatically
// export class Planning {
//   @Prop({ required: true })
//   niveau: string;

//   @Prop()
//   description?: string;

//   @Prop({ required: true })
//   image: string;

//   @Prop({ default: Date.now }) // Ensure `createdAt` is set automatically
//   createdAt: Date;
// }

// export const PlanningSchema = SchemaFactory.createForClass(Planning);
