import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { TaskModule } from './task/task.module';
import { TicketModule } from './ticket/ticket.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://fatma:fatma@cluster0.0xmaw.mongodb.net/school'),
    CourseModule,
    TaskModule,
    TicketModule,
    EnseignantModule,
    StudentModule,
  ],
})
export class AppModule {}
