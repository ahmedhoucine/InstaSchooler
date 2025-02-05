import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('school-platform/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Créer un étudiant
  @Post('/add-student')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
  //get by niveau
  @Get()
  async getStudentsByNiveau(@Query('niveau') niveau: string) {
    const parsedNiveau = parseInt(niveau, 10);
    if (isNaN(parsedNiveau)) {
      throw new BadRequestException('Invalid niveau value');
    }
    return await this.studentService.getStudentsByNiveau(parsedNiveau);
  }
  // Récupérer tous les étudiants
  @Get('/all-students')
  getAllStudents() {
    return this.studentService.getAllStudents();
  }
  //absence stats
  @Get('/absence-stats')
  async getAbsenceStats() {
    return await this.studentService.getAbsenceStats();
  }

  //count of students
  @Get('/count')
  async getStudentsNumber() {
    return await this.studentService.getStudentCount();
  }
  // Récupérer un étudiant par son ID
  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  // Mettre à jour un étudiant
  @Patch(':id')
  updateStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  // Supprimer un étudiant
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
