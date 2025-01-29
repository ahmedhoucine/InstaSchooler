import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teacher.schema';
import * as bcrypt from 'bcrypt';
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
  // Create a teacher and send an email with credentials
  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // Check if the phone number or email already exists
    const existingTeacher = await this.teacherModel.findOne({
      $or: [
        { phone: createTeacherDto.phone },
        { email: createTeacherDto.email },
      ],
    });

    if (existingTeacher) {
      throw new ConflictException(
        'A teacher with this phone number or email already exists.',
      );
    }

    // Automatically generate the password as 'firstname@LASTNAME'
    const generatedPassword = `${createTeacherDto.firstname.toLowerCase()}@${createTeacherDto.lastName.toUpperCase()}`;

    // Hash the generated password
    const hashedPassword = await this.hashPassword(generatedPassword);

    const teacher = new this.teacherModel({
      ...createTeacherDto,
      password: hashedPassword,
    });

    const savedTeacher = await teacher.save();

    // Optionally, send a welcome email with the generated password
    // await this.sendWelcomeEmail(
    //   createTeacherDto.email,
    //   createTeacherDto.email,
    //   generatedPassword,
    // );

    return savedTeacher;
  }

  // Helper method to send the email
  // private async sendWelcomeEmail(
  //   recipient: string,
  //   email: string,
  //   password: string,
  // ): Promise<void> {
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: 'instaschooler1@gmail.com',
  //       pass: '',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'instaschooler1@gmail.com',
  //     to: recipient,
  //     subject: 'Welcome to Our Platform',
  //     text: `Welcome to our platform!\n\nYour credentials are as follows:\nEmail: ${email}\nPassword: ${password}\n\nPlease keep your credentials secure.`,
  //   };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log('Email sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     throw new Error('Failed to send welcome email.');
  //   }
  // }

  // Hash password using bcrypt
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Update a teacher
  async updateTeacher(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    if (updateTeacherDto.password) {
      updateTeacherDto.password = await this.hashPassword(
        updateTeacherDto.password,
      );
    }

    const teacher = await this.teacherModel.findByIdAndUpdate(
      id,
      updateTeacherDto,
      {
        new: true,
      },
    );

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }

    return teacher;
  }

  // Delete a teacher
  async deleteTeacher(id: string): Promise<void> {
    const result = await this.teacherModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }
  }

  // Get all teachers
  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teacherModel.find().exec();
  }

  // Get a teacher by ID
  async getTeacherById(id: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findById(id).exec();
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found.`);
    }
    return teacher;
  }
}
