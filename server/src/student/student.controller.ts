import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,Request
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
  @Get('/profile')
  getProfile(@Request() req) {  // Access the request object
    const studentId = req.user?.studentId;  // Ensure that the studentId is in the user object
    if (!studentId) {
      throw new Error('Student not authenticated or not found');
    }
    return { studentId };
  }
  // Récupérer tous les étudiants
  @Get('/all-students')
  getAllStudents() {
    return this.studentService.getAllStudents();
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
