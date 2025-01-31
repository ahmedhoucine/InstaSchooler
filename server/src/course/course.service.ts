/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from './course.schema';
import { Student, StudentDocument } from '../student/schema/student.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async create(courseData: Partial<Course>): Promise<Course> {
    // Créer une nouvelle instance de cours avec les données reçues
    const course = new this.courseModel(courseData);

    // Sauvegarder le cours dans la base de données
    const savedCourse = await course.save();

    // Trouver tous les étudiants ayant le même niveau que celui du cours
    const students = await this.studentModel.find({ niveau: savedCourse.niveau });

    // Ajouter le cours à chaque étudiant
    for (const student of students) {
      student.courses.push(savedCourse._id as Types.ObjectId); // Utiliser explicitement Types.ObjectId
      await student.save(); // Sauvegarder chaque étudiant après ajout du cours
    }

    // Retourner le cours après la sauvegarde
    return savedCourse;
  }
  async findStudentsByLevel(niveau: string): Promise<Student[]> {
    return this.studentModel.find({ niveau }).exec();
  }
  async findCoursesByStudentId(studentId: string): Promise<Course[]> {
    // Trouver l'étudiant par son id
    const student = await this.studentModel.findById(studentId).exec();

    if (!student) {
      throw new Error('Student not found');
    }

    // Trouver les cours associés à l'étudiant (en utilisant les _id des cours)
    return this.courseModel.find({ _id: { $in: student.courses } }).exec();
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
        throw new NotFoundException(`course with ID ${id} not found.`);
      }
    }
  
}
