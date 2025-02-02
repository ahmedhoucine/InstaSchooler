import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventsController } from './events/events.controller';
import { AuthAdminModule } from './auth/admin-auth/auth-admin.module';
import { TaskModule } from './task/task.module';
import { TicketModule } from './ticket/ticket.module';
import { CourseModule } from './course/course.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// import { PlanningModule } from './planning/planning.module';
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
    // PlanningModule,
    EventsModule,
    AuthAdminModule,
    TaskModule,
    TicketModule,
    CourseModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  // Path to your uploads folder
      serveRoot: '/uploads',  // URL endpoint for accessing the files
    }), 
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
