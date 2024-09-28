import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

}
