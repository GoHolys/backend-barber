import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/auth/guards/user.guard';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    return this.appointmentService.create(
      createAppointmentDto,
      req.user.firstName,
    );
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
  
  @Get('filter')
  findSome(@Query('time') time: string, @Query('firstName') firstName: string) {
    return this.appointmentService.findSome(time, firstName);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const user = this.appointmentService.findOne(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentService.remove(id);
  }
}
