import {
  Controller, Post, Get, Put, Delete, Param, Body, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { PlanningService } from './planning.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post('create/:level')
  @UseInterceptors(
    FileInterceptor('planningImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = extname(file.originalname);
          const fileName = `${uuidv4()}${fileExtension}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async createPlanning(
    @Param('level') level: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const numericLevel = parseInt(level, 10);
    return await this.planningService.createPlanning(numericLevel, file);
  }

  @Get()
  async getAllPlannings() {
    return await this.planningService.getAllPlannings();
  }

  @Get(':id')
  async getPlanningById(@Param('id') id: string) {
    return await this.planningService.getPlanningById(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('planningImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtension = extname(file.originalname);
          const fileName = `${uuidv4()}${fileExtension}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async updatePlanning(
    @Param('id') id: string,
    @Body('level') level: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const numericLevel = parseInt(level, 10); 
    return await this.planningService.updatePlanning(id, numericLevel, file);
  }

  @Delete(':id')
  async deletePlanning(@Param('id') id: string) {
    return await this.planningService.deletePlanning(id);
  }
}
