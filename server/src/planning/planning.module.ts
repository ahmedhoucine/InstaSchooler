import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { Planning, PlanningSchema } from './planning.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planning.name, schema: PlanningSchema }]),
  ],
  providers: [PlanningService],
  controllers: [PlanningController],
})
export class PlanningModule {}
