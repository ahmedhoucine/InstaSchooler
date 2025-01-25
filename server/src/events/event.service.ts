import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { MyEvent, MyEventDocument } from './schema/event.schema';
import { Student, StudentDocument } from 'src/student/schema/student.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(MyEvent.name) private eventModel: Model<MyEventDocument>, // Inject Event model
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>, // Inject Student model
  ) {}

  // Create an event
  async createEvent(createEventDto: CreateEventDto): Promise<MyEvent> {
    const { studentId, ...eventData } = createEventDto;

    // Ensure the student exists
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Create the event
    const event = new this.eventModel({
      ...eventData,
      student: studentId,
    });
    const savedEvent = await event.save();

    // Ensure _id is treated correctly as ObjectId (using .toString() for conversion to string)
    const eventId = savedEvent._id instanceof Types.ObjectId
      ? savedEvent._id
      : new Types.ObjectId(savedEvent._id.toString());

    // Add the event to the student's list of events
    student.events.push(eventId);
    await student.save();

    return savedEvent;
  }

  // Get all events
  async getAllEvents(): Promise<MyEventDocument[]> {
    return await this.eventModel.find().exec();
  }

  // Update an event
  async updateEvent(id: string, updateData: Partial<CreateEventDto>): Promise<MyEventDocument> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
    return updatedEvent;
  }

  // Delete an event
  async deleteEvent(id: string): Promise<{ message: string }> {
    const result = await this.eventModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
    return { message: `Event with ID ${id} deleted successfully.` };
  }
}
