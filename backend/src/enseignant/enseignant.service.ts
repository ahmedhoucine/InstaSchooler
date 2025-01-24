import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enseignant, EnseignantDocument } from './enseignant.schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class EnseignantService {
  constructor(
    @InjectModel(Enseignant.name) private readonly enseignantModel: Model<EnseignantDocument>,
  ) {}

  async findAll(): Promise<Enseignant[]> {
    return this.enseignantModel.find().exec();
  }

  async update(id: string, updateData: Partial<Enseignant>): Promise<Enseignant | null> {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedEnseignant = await this.enseignantModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedEnseignant) {
      throw new NotFoundException(`Enseignant avec l'ID ${id} non trouvé.`);
    }

    return updatedEnseignant;
  }
}
