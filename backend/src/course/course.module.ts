import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './course.schema';

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
})
export class CourseModule {}
