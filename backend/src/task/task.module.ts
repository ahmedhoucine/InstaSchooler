import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskSchema } from './task.schema';
import { JwtAuthGuard } from '../teacher/teacher-jwt.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'teacher-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, JwtAuthGuard],
  exports: [TaskService],
})
export class TaskModule {}
