import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from './teacher-jwt.guard';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('register')
  async registerTeacher(@Body() teacherData: any) {
    const newTeacher = await this.teacherService.register(teacherData);
    return { message: 'Enregistrement réussi', teacher: newTeacher };
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const teacher = await this.teacherService.validateTeacher(email, password);

      const payload = {
        id: teacher._id.toString(),
        email: teacher.email,
        name: teacher.firstname,
        profileImage: teacher.profilePicture,
      };
      const token = this.teacherService.generateToken(payload);

      return { message: 'Connexion réussie', token };
    } catch (error) {
      throw new BadRequestException('Email ou mot de passe incorrect.');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    const teacherId = req.user.id;
    return this.teacherService.getTeacherById(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(@Request() req, @Body() updateData: any) {
    const teacherId = req.user.id;

    if (updateData.currentPassword && updateData.newPassword) {
      const isValid = await this.teacherService.validatePassword(
        teacherId,
        updateData.currentPassword,
      );
      if (!isValid) {
        throw new BadRequestException('Mot de passe actuel incorrect.');
      }
      updateData.password = updateData.newPassword;
      delete updateData.currentPassword;
      delete updateData.newPassword;
    }

    return this.teacherService.updateTeacher(teacherId, updateData);
  }
}
