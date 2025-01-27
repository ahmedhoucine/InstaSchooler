import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(teacherData: Partial<Teacher>): Promise<Teacher> {
    if (!teacherData.password) {
      throw new BadRequestException('Le mot de passe est obligatoire.');
    }
    const hashedPassword = await bcrypt.hash(teacherData.password, 10);
    const teacher = new this.teacherModel({
      ...teacherData,
      password: hashedPassword,
      profileImage: teacherData.profilePicture || 'assets/image1.png', // Valeur par défaut
    });
    return teacher.save();
  }

  async validateTeacher(email: string, plainPassword: string): Promise<TeacherDocument> {
    const teacher = await this.teacherModel.findOne({ email }).exec();
    if (!teacher) {
      throw new NotFoundException('Email ou mot de passe incorrect.');
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, teacher.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect.');
    }

    return teacher;
  }

  async getTeacherById(teacherId: string): Promise<TeacherDocument> {
    const teacher = await this.teacherModel.findById(teacherId).exec();
    if (!teacher) {
      throw new NotFoundException('Enseignant non trouvé.');
    }
    return teacher;
  }

  async updateTeacher(teacherId: string, updateData: Partial<Teacher>): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(teacherId).exec();
    if (!teacher) {
      throw new NotFoundException('Enseignant non trouvé.');
    }

    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }

    Object.assign(teacher, updateData);
    return teacher.save();
  }

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async validatePassword(teacherId: string, plainPassword: string): Promise<boolean> {
    const teacher = await this.teacherModel.findById(teacherId).exec();
    if (!teacher) {
      throw new NotFoundException('Enseignant non trouvé.');
    }

    return bcrypt.compare(plainPassword, teacher.password || '');
  }
}
