import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Student } from './schema/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  // Create a student and send an email with credentials
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const existingStudent = await this.studentModel.findOne({
      email: createStudentDto.email,
    });

    if (existingStudent) {
      throw new ConflictException('A student with this email already exists.');
    }

    const generatedPassword = `${createStudentDto.firstname.toLowerCase()}@${createStudentDto.lastName.toUpperCase()}`;

    const hashedPassword = await this.hashPassword(generatedPassword);

    const student = new this.studentModel({
      ...createStudentDto,
      password: hashedPassword,
    });

    const savedStudent = await student.save();

    await this.sendWelcomeEmail(
      createStudentDto.email,
      createStudentDto.email,
      generatedPassword,
    );

    return savedStudent;
  }

  // Helper method to send the email
  private async sendWelcomeEmail(
    recipient: string,
    email: string,
    password: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'evengbook@gmail.com',
        pass: 'mzat hrtf uxro qczv',
      },
    });

    const mailOptions = {
      from: 'instaschooler1@gmail.com',
      to: recipient,
      subject: 'Welcome to Our Platform',
      text: `Welcome to our platform!\n\nYour credentials are as follows:\nEmail: ${email}\nPassword: ${password}\n\nPlease keep your credentials secure.\n\nINSTASCHOOLER TEAM`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send welcome email.');
    }
  }

  // Hash password using bcrypt
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Update a student
  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    if (updateStudentDto.password) {
      updateStudentDto.password = await this.hashPassword(
        updateStudentDto.password,
      );
    }

    const student = await this.studentModel.findByIdAndUpdate(
      id,
      updateStudentDto,
      {
        new: true,
      },
    );

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }

    return student;
  }

  //student count 
  async getStudentCount(): Promise<number> {
    return await this.studentModel.countDocuments();
  }

  // Delete a student
  async deleteStudent(id: string): Promise<void> {
    const result = await this.studentModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
  }

  // Get all students
  async getAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  // Get a student by ID
  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    return student;
  }
  async getStudentsByNiveau(niveau: number): Promise<Student[]> {
    return await this.studentModel.find({ niveau });
  }
  //absence stats
  async getAbsenceStats(): Promise<{ niveau: number; absences: number }[]> {
    const niveaux = [1, 2, 3, 4];
    const stats = await Promise.all(
      niveaux.map(async (niveau) => {
        const absences = await this.studentModel.countDocuments({ niveau, status: 'Absent' });
        return { niveau, absences };
      }),
    );
    return stats;
  }
}
