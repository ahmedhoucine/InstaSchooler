import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from 'src/student/schema/student.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, UpdateProfileDto } from './dto/login.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

@Injectable()
export class AuthService {
  adminLogin(loginDto: AdminLoginDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Student.name) private userModel: Model<Student>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log('Login attempt with email:', email); 

    const user = await this.userModel.findOne({ email });

    if (!user) {
      console.log('User not found for email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      console.log('Password mismatch for email:', email); 
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileResponseDto> {
    const user = await this.userModel.findById(userId).exec();
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (updateProfileDto.password !== updateProfileDto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    if (updateProfileDto.currentPassword) {
      const isPasswordValid = await bcrypt.compare(
        updateProfileDto.currentPassword,
        user.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }

      updateProfileDto.password = await bcrypt.hash(
        updateProfileDto.password,
        10,
      );
    }

    if (updateProfileDto.username) {
      user.username = updateProfileDto.username;
    }
  
    if (updateProfileDto.profilePicture) {
      user.profilePicture = updateProfileDto.profilePicture;
    }

    await user.save();
  
    return {
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    };
  }
  
  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      userId: user._id.toString(), 
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    };
  }
}
