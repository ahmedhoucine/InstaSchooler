import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './course.schema';
import { Student, StudentSchema } from '../student/schema/student.schema';
import { CourseController } from './course.controller';
import { StudentModule } from '../student/student.module'; // Import du module Student


@Module({
  imports: [
   
      MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
      StudentModule, // Ajoutez StudentModule ici

    JwtModule.register({
      secret: process.env.JWT_SECRET || 'teacher-secret-key',
      signOptions: { expiresIn: '7h' },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
