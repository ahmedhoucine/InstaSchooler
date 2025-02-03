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

  // Create Planning (Ensure only one planning per niveau)
  async createPlanning(level: number, file: Express.Multer.File): Promise<Planning> {
    const existingPlanning = await this.planningModel.findOne({ niveau: level }).exec();
    if (existingPlanning) {
      throw new Error(`A planning already exists for niveau ${level}`);
    }

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
  async updatePlanning(id: string, niveau: number, file?: Express.Multer.File): Promise<Planning> {
    // Check if the niveau already exists in another planning
    const existingPlanningWithNewNiveau = await this.planningModel.findOne({ niveau }).exec();
    if (existingPlanningWithNewNiveau) {
      throw new Error(`A planning already exists for niveau ${niveau}. You cannot change to this niveau.`);
    }

    const updateData: any = { niveau };
    if (file) {
      updateData.filename = file.filename;
      updateData.path = file.path;
    }

    const updatedPlanning = await this.planningModel.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );
    if (!updatedPlanning) {
      throw new Error(`Planning with ID ${id} not found`);
    }

    return updatedPlanning;
  }

  // Delete Planning by ID
  async deletePlanning(id: string): Promise<boolean> {
    const result = await this.planningModel.deleteOne({ id }).exec();
    return result.deletedCount > 0;
  }
}