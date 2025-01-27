import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>,
  ) {}

  async getStudentsByNiveau(niveau: number, teacherId: string): Promise<Student[]> {
    return this.studentModel.find({ niveau, teacher: teacherId }).exec();
  }

  async updateStudentsStatus(studentUpdates: { id: string; status: string }[]): Promise<void> {
    for (const update of studentUpdates) {
      await this.studentModel.findByIdAndUpdate(update.id, { status: update.status }).exec();
    }
  }

  async getAbsenceStats(teacherId: string) {
    const levels = await this.studentModel.aggregate([
      { $match: { teacher: teacherId } },
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

  async getTotalStudents(teacherId: string): Promise<number> {
    return this.studentModel.countDocuments({ teacher: teacherId }).exec();
  }

  async createStudent(studentData: Partial<Student>): Promise<Student> {
    const student = new this.studentModel(studentData);
    return student.save();
  }
}
