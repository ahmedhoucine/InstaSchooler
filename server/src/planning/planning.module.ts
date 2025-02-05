import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { Planning, PlanningSchema } from './schema/planning.schema';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Planning.name, schema: PlanningSchema },
    ]),

    StudentModule,
  ],
  providers: [PlanningService],
  controllers: [PlanningController],
})
export class PlanningModule {}
