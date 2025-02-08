import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { AuthAdminModule } from './auth/admin-auth/auth-admin.module';
import { TaskModule } from './task/task.module';
import { TicketModule } from './ticket/ticket.module';
import { CourseModule } from './course/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlanningModule } from './planning/planning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CommonModule,
    StudentModule,
    TeacherModule,
    AuthModule,
    PlanningModule,
    EventsModule,
    AuthAdminModule,
    TaskModule,
    TicketModule,
    CourseModule,
    PlanningModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/uploads', 
    }),
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
