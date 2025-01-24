import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentSeederService } from './student.seeder'; // Import du service de seed

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentSeederService],
  exports: [StudentService], // Exportez si nécessaire
})
export class StudentModule implements OnModuleInit {
  constructor(private readonly studentSeederService: StudentSeederService) {}

  async onModuleInit() {
    // Initialiser les étudiants à chaque démarrage
    await this.studentSeederService.seedStudents();
  }
}
