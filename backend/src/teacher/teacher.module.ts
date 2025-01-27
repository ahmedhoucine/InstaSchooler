import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher, TeacherSchema } from './teacher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'teacher-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
