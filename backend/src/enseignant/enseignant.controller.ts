import {
    Controller,
    Get,
    Put,
    Post,
    Body,
    Param,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { EnseignantService } from './enseignant.service';
  import { Enseignant } from './enseignant.schema';
  
  @Controller('enseignant')
  export class EnseignantController {
    constructor(private readonly enseignantService: EnseignantService) {}
  
    @Get()
    async findAll(): Promise<Enseignant[]> {
      return this.enseignantService.findAll();
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateData: Partial<Enseignant>,
    ): Promise<Enseignant> {
      if (!id) {
        throw new BadRequestException('L\'ID de l\'enseignant est requis.');
      }
  
      const updatedEnseignant = await this.enseignantService.update(id, updateData);
  
      if (!updatedEnseignant) {
        throw new NotFoundException(`Enseignant avec l'ID ${id} non trouvé.`);
      }
  
      return updatedEnseignant;
    }
  }
  