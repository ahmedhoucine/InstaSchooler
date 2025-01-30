import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './course.schema';
import { Student, StudentSchema } from '../student/schema/student.schema';
import { CourseController } from './course.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'teacher-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}


 
