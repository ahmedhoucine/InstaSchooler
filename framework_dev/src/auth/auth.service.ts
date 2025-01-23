import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, UpdateProfileDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log('Login attempt with email:', email); // Add logging here
  
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      console.log('User not found for email:', email);
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      console.log('Password mismatch for email:', email);  // Add logging here
      throw new UnauthorizedException('Invalid email or password');
    }
  
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<ProfileResponseDto> {
    const user = await this.userModel.findById(userId).exec();
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    // Ensure the new password and confirm password match
    if (updateProfileDto.password !== updateProfileDto.confirmPassword) {
      throw new BadRequestException('Password and confirm password do not match');
    }
  
    // Check if current password is provided and valid
    if (updateProfileDto.currentPassword) {
      const isPasswordValid = await bcrypt.compare(updateProfileDto.currentPassword, user.password);
  
      if (!isPasswordValid) {
        throw new BadRequestException('Current password is incorrect');
      }
  
      // If current password is valid, hash the new password
      updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, 10);
    }
  
    // Proceed to update fields
    if (updateProfileDto.username) {
      user.username = updateProfileDto.username;
    }
  
    if (updateProfileDto.password) {
      user.password = updateProfileDto.password; // Ensure this is the hashed password
      console.log(updateProfileDto.profilePicture);
    }
  
    if (updateProfileDto.profilePicture) {
      user.profilePicture = updateProfileDto.profilePicture;
    }
  
    // Save the updated user to the database
    await user.save();
  
    // Return the updated profile as a ProfileResponseDto
    return {
      userId: user._id.toString(), // Return the MongoDB _id as userId
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

    // Return necessary profile information as ProfileResponseDto
    return {
      userId: user._id.toString(), // Return the MongoDB _id as userId
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}  