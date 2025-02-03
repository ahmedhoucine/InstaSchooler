import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = new this.taskModel(taskData);
    return task.save();
  }

  async findAllByTeacher(teacherId: string): Promise<Task[]> {
    return this.taskModel.find({ teacher: teacherId }).exec();
  }

  async getTasksForToday(teacherId: string): Promise<Task[]> {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    return this.taskModel.find({ teacher: teacherId, date: today }).exec();
  }

  async deleteTask(taskId: string): Promise<void> {
    const result = await this.taskModel.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      throw new Error(`Tâche avec l'ID ${taskId} introuvable.`);
    }
  }
}
