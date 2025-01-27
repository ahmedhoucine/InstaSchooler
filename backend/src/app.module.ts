import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { TaskModule } from './task/task.module';
import { TicketModule } from './ticket/ticket.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://fatma:fatma@cluster0.0xmaw.mongodb.net/school'),
    CourseModule,
    TaskModule,
    TicketModule,
    EnseignantModule,
    StudentModule,
    TeacherModule,
  ],
})
export class AppModule {}
