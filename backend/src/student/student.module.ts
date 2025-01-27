import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student, StudentSchema } from './student.schema';
import { StudentSeederService } from './student.seeder';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentSeederService],
  exports: [StudentService], // S'assurer que les services nécessaires sont exportés si besoin
})
export class StudentModule implements OnModuleInit {
  constructor(private readonly studentSeederService: StudentSeederService) {}

  async onModuleInit() {
    const teacherId = '6796c4ddc54c316796bc4175'; // Remplace par l'ID d'un enseignant existant
    await this.studentSeederService.seedStudents(teacherId);
  }
}
