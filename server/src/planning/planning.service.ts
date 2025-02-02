import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Planning, PlanningDocument } from './planning.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlanningService {
  constructor(
    @InjectModel(Planning.name) private readonly planningModel: Model<PlanningDocument>,
  ) {}

  // Create Planning
  async createPlanning(level: number, file: Express.Multer.File): Promise<Planning> {
    const planning = new this.planningModel({
      id: uuidv4(),
      niveau: level,
      filename: file.filename,
      path: `/uploads/${file.filename}`,
    });

    return await planning.save();
  }

  // Get all Plannings
  async getAllPlannings(): Promise<Planning[]> {
    return this.planningModel.find().exec();
  }

  // Get planning by ID
  async getPlanningById(id: string): Promise<Planning> {
    return this.planningModel.findOne({ id }).exec();
  }

  // Update Planning by ID
  async updatePlanning(id: string, level: number, file: Express.Multer.File): Promise<Planning> {
    return this.planningModel.findOneAndUpdate(
      { id },
      {
        niveau: level,
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      },
      { new: true },
    ).exec();
  }

  // Delete Planning by ID
  async deletePlanning(id: string): Promise<boolean> {
    const result = await this.planningModel.deleteOne({ id }).exec();
    return result.deletedCount > 0;
  }
}
