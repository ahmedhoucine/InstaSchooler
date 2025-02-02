import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>
  ) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = new this.courseModel(courseData);
    return course.save();
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
