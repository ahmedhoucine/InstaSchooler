import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
  ) {}

  async getStudentsByNiveau(niveau: number): Promise<Student[]> {
    return this.studentModel.find({ niveau }).exec();
  }

  async updateStudentsStatus(studentUpdates: { id: string; status: string }[]): Promise<void> {
    for (const update of studentUpdates) {
      await this.studentModel.findByIdAndUpdate(update.id, { status: update.status }).exec();
    }
  }

  async getAbsenceStats() {
    const levels = await this.studentModel.aggregate([
      {
        $group: {
          _id: '$niveau',
          absences: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Absent'] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          niveau: '$_id',
          absences: 1,
          _id: 0,
        },
      },
    ]);

    return levels;
  }
  async getTotalStudents(): Promise<number> {
    return this.studentModel.countDocuments().exec();
  }
}
