import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class User extends Document {
  @Prop()
  id: string; // You can use the default '_id' from MongoDB, but this explicitly defines it

  @Prop()
  firstname: string; // First Name

  @Prop()
  lastName: string; // Last Name
  @Prop()
  username: string; // Last Name

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string; // Email field with uniqueness constraint

  @Prop()
  password: string; // Password

  @Prop()
  createdAt: Date; // Creation date

  @Prop()
  updatedAt: Date; // Update date

  @Prop()
  deletedAt: Date; // Soft deletion date, useful for "soft delete" functionality

  @Prop()
  profilePicture: string; // URL or path to the profile picture
}

// Create the schema based on the updated User class
export const UserSchema = SchemaFactory.createForClass(User);
