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
  NotFoundException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { Course } from './course.schema';
import { Student } from 'src/student/schema/student.schema';
import * as path from 'path';
import * as fs from 'fs';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pdf', { dest: './uploads' })) // Dossier des uploads
  async create(
    @Body() courseData: Partial<Course>,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Course> {
    console.log('Données reçues :', courseData);

    // Vérifier que les champs obligatoires sont bien remplis
    if (!courseData.niveau || !courseData.description || !courseData.duration) {
      throw new BadRequestException(
        'Les champs niveau, description et duration sont obligatoires.',
      );
    }

    console.log(file);

    // Vérifier si un fichier a bien été uploadé
    if (!file) {
      throw new BadRequestException('Le fichier PDF est obligatoire.');
    }

    // Ajouter l'extension .pdf au fichier sauvegardé
    const pdfFilename = `${file.filename}.pdf`;
    const oldPath = file.path;
    const newPath = path.join(path.dirname(oldPath), pdfFilename);

    try {
      fs.renameSync(oldPath, newPath); // Renommer le fichier avec l'extension .pdf
    } catch (error) {
      console.error('Erreur lors du renommage du fichier :', error);
      throw new BadRequestException(
        'Une erreur est survenue lors du traitement du fichier.',
      );
    }

    const pdfPath = `http://localhost:3000/uploads/${pdfFilename}`; // Construire l'URL du fichier

    console.log('Chemin du fichier PDF :', pdfPath);

    // Sauvegarder le cours avec le lien vers le fichier PDF
    const newCourse = await this.courseService.create({
      ...courseData,
      pdf: pdfPath,
      createdAt: new Date(),
    });

    console.log('Cours créé :', newCourse);

    return newCourse;
  }

  @Get('uploads/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.resolve('uploads', filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Fichier non trouvé.');
    }

    // Forcer le téléchargement avec le bon type MIME
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    res.download(filePath);
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.findById(id);
  }

  @Get('student/:id')
  async findCoursesByStudentId(@Param('id') id: string) {
    return this.courseService.findCoursesByStudentId(id);
  }

  @Get('students-by-level/:niveau')
  async getStudentsByLevel(@Param('niveau') niveau: string): Promise<Student[]> {
    return this.courseService.findStudentsByLevel(niveau);
  }

  @Get('students-count-by-level/:niveau')
  async getStudentsCountByLevel(@Param('niveau') niveau: string): Promise<number> {
    return this.courseService.countStudentsByLevel(niveau);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Course | null> {
    return this.courseService.delete(id);
  }
}
