import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyEventSchema } from './schema/event.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Event.name, schema: MyEventSchema }])], // Register schema with Mongoose

  controllers: [EventsController],
  providers: [EventService],
  exports: [EventService], // Export if used in other modules
})
export class EventsModule {}
