import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnseignantController } from './enseignant.controller';
import { EnseignantService } from './enseignant.service';
import { Enseignant, EnseignantSchema } from './enseignant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Enseignant.name, schema: EnseignantSchema }]),
  ],
  controllers: [EnseignantController],
  providers: [EnseignantService],
})
export class EnseignantModule {}
