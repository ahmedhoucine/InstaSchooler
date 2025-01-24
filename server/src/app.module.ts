import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventsController } from './events/events.controller';
import { AuthAdminModule } from './auth/admin-auth/auth-admin.module';

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
    ClassModule,
    AuthModule,
    EventsModule,
    AuthAdminModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
