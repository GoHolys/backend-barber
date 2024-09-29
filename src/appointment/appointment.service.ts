import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateAppointmentDto } from './dto/createAppointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private UserService: UserService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, firstName: string) {
    const createAppointment = await this.prisma.appointment.create({
      data: { ...createAppointmentDto, firstName },
    });
    return createAppointment;
  }

  async findAll() {
    return await this.prisma.appointment.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.appointment.findUnique({ where: { id } });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const updateAppointment = await this.prisma.appointment.update({
      where: {
        id,
      },
      data: updateAppointmentDto,
    });
    console.log(updateAppointment);
    return updateAppointment;
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async findSome(time: string, firstName: string) {
    const startOfDay = new Date(time);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(time);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await this.prisma.appointment.findMany({
      where: {
        ...(!isNaN(startOfDay.getTime()) && !isNaN(endOfDay.getTime())
          ? {
              time: {
                gte: startOfDay,
                lt: endOfDay,
              },
            }
          : {}),
        ...(firstName
          ? {
              firstName: {
                contains: firstName,
              },
            }
          : {}),
      },
    });

    return appointments;
  }
}
