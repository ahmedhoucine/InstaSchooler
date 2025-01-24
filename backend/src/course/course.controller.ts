import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CourseService } from './course.service';
  import { Course } from './course.schema';
  
  @Controller('courses')
  export class CourseController {
    constructor(private readonly courseService: CourseService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor('pdf', { dest: './uploads' }))
    async create(
      @Body() courseData: Partial<Course>,
      @UploadedFile() file?: Express.Multer.File,
    ): Promise<Course> {
      console.log('Données reçues :', courseData);
  
      if (!courseData.niveau || !courseData.description || !courseData.duration) {
        throw new BadRequestException('Les champs niveau, description et duration sont obligatoires.');
      }
  
      const pdfPath = file ? `http://localhost:3000/uploads/${file.filename}` : null;
  
      return this.courseService.create({
        ...courseData,
        pdf: pdfPath,
      });
    }
  
    @Get()
    async findAll(): Promise<Course[]> {
      return this.courseService.findAll();
    }
  
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Course | null> {
      return this.courseService.findById(id);
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Course | null> {
      return this.courseService.delete(id);
    }
  }
  