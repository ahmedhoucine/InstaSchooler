import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { MyEvent } from './schema/event.schema';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventService) {}

  // POST /events - Create a new event
  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<MyEvent> {
    console.log("test ---------------");
    
    return await this.eventService.createEvent(createEventDto);
  }

  // GET /events - Retrieve all events
  @Get()
  async getAll(): Promise<MyEvent[]> {
    return await this.eventService.getAllEvents();
  }
  

  // PUT /events/:id - Update an event
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateEventDto>, // Partial DTO for flexibility
  ): Promise<MyEvent> {
    return await this.eventService.updateEvent(id, updateData);
  }

  // DELETE /events/:id - Delete an event
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return await this.eventService.deleteEvent(id);
  }
}
