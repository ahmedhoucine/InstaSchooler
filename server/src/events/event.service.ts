import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { MyEvent, MyEventDocument } from './schema/event.schema';
import { Student, StudentDocument } from 'src/student/schema/student.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(MyEvent.name) private eventModel: Model<MyEventDocument>, 
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>, 
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<MyEvent> {
    const { studentId, ...eventData } = createEventDto;

    
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const event = new this.eventModel({
      ...eventData,
      student: studentId,
    });
    const savedEvent = await event.save();

    const eventId =
      savedEvent._id instanceof Types.ObjectId
        ? savedEvent._id
        : new Types.ObjectId(savedEvent._id.toString());

    student.events.push(eventId);
    await student.save();

    return savedEvent;
  }
  async getEventsByUserId(userId: string): Promise<MyEventDocument[]> {
    const student = await this.studentModel.findById(userId).exec();
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return await this.eventModel.find({ student: userId }).exec();
  }

  async getAllEvents(): Promise<MyEventDocument[]> {
    return await this.eventModel.find().exec();
  }

  async updateEvent(
    id: string,
    updateData: Partial<CreateEventDto>,
  ): Promise<MyEventDocument> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<{ message: string }> {
    const result = await this.eventModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found.`);
    }
    return { message: `Event with ID ${id} deleted successfully.` };
  }
}
