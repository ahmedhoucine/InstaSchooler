import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Ajouter une tâche
  @Post()
  async create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.taskService.create(taskData);
  }

  // Récupérer toutes les tâches
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  // Récupérer une tâche par ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
  }
}
