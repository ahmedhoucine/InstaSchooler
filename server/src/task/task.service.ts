import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  // Créer une tâche
  async create(taskData: Partial<Task>): Promise<Task> {
    if (!taskData.date) {
      throw new BadRequestException('Le champ "date" est obligatoire.');
    }
  
    const formattedDate = new Date(taskData.date).toISOString().split('T')[0];
    const newTask = new this.taskModel({ ...taskData, date: formattedDate });
    return newTask.save();
  }
  
  
  
  // Récupérer toutes les tâches
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  // Récupérer une tâche par ID
  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Tâche avec l'ID ${id} non trouvée`);
    }
    return task;
  }
}
