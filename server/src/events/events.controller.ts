import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { MyEvent } from './schema/event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<any> {
    console.log('Received data:', createEventDto);

    try {
      const createdEvent = await this.eventService.createEvent(createEventDto);
      console.log('Created Event:', createdEvent);
      return { message: 'Event created successfully', event: createdEvent };
    } catch (error) {
      console.error('Error during event creation:', error);
      throw new Error('Failed to create event');
    }
  }

  @Get('by-user')
  async getEventsByUserId(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('userId is required');
    }
    return this.eventService.getEventsByUserId(userId);
  }
  @Get()
  async getAll(): Promise<MyEvent[]> {
    return await this.eventService.getAllEvents();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateEventDto>, 
  ): Promise<MyEvent> {
    return await this.eventService.updateEvent(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return await this.eventService.deleteEvent(id);
  }
}
