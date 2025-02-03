// import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
// import { PlanningService } from './planning.service';
// import { CreatePlanningDto } from './dto/planning.dto';
// import { Planning } from './schema/planning.schema';

// @Controller('planning')
// export class PlanningController {
//   constructor(private readonly planningService: PlanningService) {}

//   @Post()
//   async create(@Body() createPlanningDto: CreatePlanningDto): Promise<Planning> {
//     return this.planningService.create(createPlanningDto);
//   }

//   @Get()
//   async findAll(): Promise<Planning[]> {
//     return this.planningService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<Planning> {
//     return this.planningService.findOne(id);
//   }

//   @Get('student/:studentId')
//   async getPlanningForStudent(@Param('studentId') studentId: string): Promise<Planning[]> {
//     return this.planningService.getPlanningForStudent(studentId);
//   }
// }
