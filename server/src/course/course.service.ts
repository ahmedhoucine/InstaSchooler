import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = new this.courseModel(courseData);
    return course.save();
  }
  
  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findById(id: string): Promise<Course | null> {
    return this.courseModel.findById(id).exec();
  }
  
  async delete(id: string): Promise<Course | null> {
    return this.courseModel.findByIdAndDelete(id).exec();
  }
  
}
