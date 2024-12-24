import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { MyEventDocument } from './schema/event.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<MyEventDocument>, // Inject Event model
  ) {}

  // Create an event
  async createEvent(createEventDto: CreateEventDto): Promise<MyEventDocument> {
    const event = new this.eventModel(createEventDto);
    return await event.save();
  }
  
  async getAllEvents(): Promise<MyEventDocument[]> {
    return await this.eventModel.find().exec();
  }
  
  async updateEvent(id: string, updateData: Partial<CreateEventDto>): Promise<MyEventDocument> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(id, updateData, { new: true });
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