import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlanningDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  niveau: number;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  path: string;
}
