import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Teacher, TeacherDocument } from './teacher.schema';
import { JwtService } from '@nestjs/jwt';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
      @InjectModel(Teacher.name) private teacherModel: Model<TeacherDocument>,
      private readonly jwtService: JwtService,
  ) {}

  async register(teacherData: Partial<Teacher>): Promise<Teacher> {
    // Generate password if not provided
    const password =
        teacherData.password ||
        `${teacherData.firstname}@${teacherData.lastName?.toUpperCase()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new this.teacherModel({
      ...teacherData,
      password: hashedPassword,
      profilePicture:
          teacherData.profilePicture ||
          'assets/images/default-profile-picture.png',
    });

    return teacher.save();
  }

  async validateTeacher(
      email: string,
      plainPassword: string,
  ): Promise<TeacherDocument> {
    const teacher = await this.teacherModel
        .findOne({ email })
        .select('+password')
        .exec();
    if (!teacher || !(await bcrypt.compare(plainPassword, teacher.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return teacher;
  }

  async validatePassword(
      teacherId: string,
      plainPassword: string,
  ): Promise<boolean> {
    const teacher = await this.teacherModel
        .findById(teacherId)
        .select('+password')
        .exec();
    return teacher ? bcrypt.compare(plainPassword, teacher.password) : false;
  }

  generateToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'teacher-secret-key',
    });
  }

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // Normalize email to lowercase
    const email = createTeacherDto.email.toLowerCase();

    // Check for existing teacher by email or phone
    const existingTeacher = await this.teacherModel.findOne({
      $or: [{ phone: createTeacherDto.phone }, { email }],
    });

    if (existingTeacher) {
      // Compare the fields to determine the conflict
      const emailConflict = existingTeacher.email === email;
      const phoneConflict = existingTeacher.phone === createTeacherDto.phone;

      if (emailConflict && phoneConflict) {
        throw new ConflictException(
            'Teacher with this email and phone number already exists.'
        );
      } else if (emailConflict) {
        throw new ConflictException(
            'Teacher with this email already exists.'
        );
      } else if (phoneConflict) {
        throw new ConflictException(
            'Teacher with this phone number already exists.'
        );
      } else {
        // Fallback error message if somehow both conflict checks fail
        throw new ConflictException(
            'Teacher with this contact info already exists.'
        );
      }
    }

    // Generate a password based on teacher's first and last names
    const generatedPassword = `${createTeacherDto.firstname}@${createTeacherDto.lastName.toUpperCase()}`;
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newTeacher = new this.teacherModel({
      ...createTeacherDto,
      email,
      password: hashedPassword,
    });

    const savedTeacher = await newTeacher.save();

    // Send welcome email with the generated credentials
    await this.sendWelcomeEmail(
        createTeacherDto.email,
        createTeacherDto.email,
        generatedPassword
    );

    return savedTeacher;
  }

  // Helper method to send a welcome email with credentials
  private async sendWelcomeEmail(
      recipient: string,
      email: string,
      password: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465, // secure SMTP port for Gmail
      secure: true,
      auth: {
        user: 'evengbook@gmail.com',
        pass: 'mzat hrtf uxro qczv',
      },
    });

    const mailOptions = {
      from: '"Instaschooler Team" <evengbook@gmail.com>',
      to: recipient,
      subject: 'Welcome to Our Platform',
      text: `Welcome to our platform!

Your credentials are as follows:
Email: ${email}
Password: ${password}

Please keep your credentials secure.

INSTASCHOOLER TEAM`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!', info);
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

  async updateTeacher(
      id: string,
      updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    if (updateTeacherDto.password) {
      updateTeacherDto.password = await this.hashPassword(
          updateTeacherDto.password,
      );
    }

    const teacher = await this.teacherModel
        .findByIdAndUpdate(id, updateTeacherDto, { new: true })
        .exec();

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }

    return teacher;
  }

  async deleteTeacher(id: string): Promise<void> {
    const result = await this.teacherModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teacherModel.find().exec();
  }

  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }
    return teacher;
  }
}
