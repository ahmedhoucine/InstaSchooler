import { Body, Controller, Get, Post, Put, Query, UseGuards, Request } from '@nestjs/common';
import { StudentService } from './student.service';
import { JwtAuthGuard } from '../teacher/teacher-jwt.guard';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStudent(@Body() studentData: any, @Request() req) {
    const teacherId = req.user.id;
    return this.studentService.createStudent({ ...studentData, teacher: teacherId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getStudentsByNiveau(@Query('niveau') niveau: number, @Request() req) {
    const teacherId = req.user.id;
    return this.studentService.getStudentsByNiveau(niveau, teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-status')
  async updateStudentsStatus(@Body() updates: { id: string; status: string }[]) {
    await this.studentService.updateStudentsStatus(updates);
    return { message: 'Statuts mis à jour avec succès.' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('absence-stats')
  async getAbsenceStats(@Request() req) {
    const teacherId = req.user.id;
    return this.studentService.getAbsenceStats(teacherId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getTotalStudents(@Request() req): Promise<{ count: number }> {
    const teacherId = req.user.id;
    const count = await this.studentService.getTotalStudents(teacherId);
    return { count };
  }
}
