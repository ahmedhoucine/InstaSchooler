import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { Student, StudentDocument } from '../student/schema/student.schema';
@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = new this.courseModel(courseData);
    return course.save();
  }
  async getCoursesForStudent(studentId: string) {
    const student = await this.studentModel.findById(studentId);
    if (!student) {
      throw new NotFoundException('Étudiant non trouvé');
    }

    return await this.courseModel.find({ niveau: student.niveau });
  }

  async findByTeacher(teacherId: string): Promise<Course[]> {
    return this.courseModel.find({ teacher: teacherId }).exec();
  }

  async countByTeacher(teacherId: string): Promise<number> {
    return this.courseModel.countDocuments({ teacher: teacherId }).exec();
  }

  async allcourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async deleteCourse(id: string): Promise<void> {
    const result = await this.courseModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Course with ID ${id} not found.`);
    }
  }
}
