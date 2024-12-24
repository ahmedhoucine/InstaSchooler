import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}
