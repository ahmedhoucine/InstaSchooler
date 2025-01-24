import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getStudentsByNiveau(@Query('niveau') niveau: number) {
    return this.studentService.getStudentsByNiveau(niveau);
  }

  @Put('update-status')
  async updateStudentsStatus(@Body() updates: { id: string; status: string }[]) {
    await this.studentService.updateStudentsStatus(updates);
    return { message: 'Statuts mis à jour avec succès.' };
  }


  @Get('absence-stats')
  async getAbsenceStats() {
    return this.studentService.getAbsenceStats();
  }
  @Get('count')
  async getTotalStudents(): Promise<{ count: number }> {
    const count = await this.studentService.getTotalStudents();
    return { count };
  }
  
}
