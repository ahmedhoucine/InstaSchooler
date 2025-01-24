import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './student.schema';

@Injectable()
export class StudentSeederService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async seedStudents(): Promise<void> {
    const students = [
      { name: 'Ahmed', surname: 'Ben Ali', niveau: 1, status: 'Présent' },
      { name: 'Sarra', surname: 'Trabelsi', niveau: 1, status: 'Présent' },
      { name: 'Omar', surname: 'Haddad', niveau: 2, status: 'Présent' },
      { name: 'Yasmine', surname: 'Ben Romdhane', niveau: 2, status: 'Présent' },
      { name: 'Khaled', surname: 'Zidi', niveau: 3, status: 'Présent' },
      { name: 'Amel', surname: 'Mansouri', niveau: 3, status: 'Présent' },
    ];

    for (const student of students) {
      await this.studentModel.updateOne(
        { name: student.name, surname: student.surname, niveau: student.niveau },
        student,
        { upsert: true },
      );
    }
  }
}
