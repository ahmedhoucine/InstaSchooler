// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Planning, PlanningDocument } from './schema/planning.schema';
// import { Student, StudentDocument } from '../student/schema/student.schema'; // Assurez-vous que le modèle étudiant est bien importé
// import { CreatePlanningDto } from './dto/planning.dto';

// @Injectable()
// export class PlanningService {
//   constructor(
//     @InjectModel(Planning.name) private planningModel: Model<PlanningDocument>,
//     @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
//   ) {}

//   async create(createPlanningDto: CreatePlanningDto): Promise<Planning> {
//     const newPlanning = new this.planningModel(createPlanningDto);
//     return newPlanning.save();
//   }

//   async findAll(): Promise<Planning[]> {
//     return this.planningModel.find().exec();
//   }

//   async findOne(id: string): Promise<Planning> {
//     return this.planningModel.findById(id).exec();
//   }

//   async getPlanningForStudent(studentId: string): Promise<Planning[]> {
//     const student = await this.studentModel.findById(studentId);
//     if (!student) {
//       throw new NotFoundException('Étudiant non trouvé');
//     }

//     return this.planningModel.find({ niveau: student.niveau }).exec();
//   }
// }
