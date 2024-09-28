import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, firstName: string) {
    return await this.prisma.appointment.create({
      data: { ...createAppointmentDto, firstName },
    });
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.appointment.findUnique({ where: { id } });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: {
        id,
      },
      data: updateAppointmentDto,
    });
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
