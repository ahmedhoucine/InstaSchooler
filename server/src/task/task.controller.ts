import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../teacher/teacher-jwt.guard';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() taskData: any) {
    const teacherId = req.user.id;
    return this.taskService.create({ ...taskData, teacher: teacherId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByTeacher(@Request() req) {
    const teacherId = req.user.id;
    return this.taskService.findAllByTeacher(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  async getTasksForToday(@Request() req) {
    const teacherId = req.user.id;
    return this.taskService.getTasksForToday(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(@Param('id') taskId: string) {
    await this.taskService.deleteTask(taskId);
    return { message: 'Tâche supprimée avec succès.' };
  }
}
