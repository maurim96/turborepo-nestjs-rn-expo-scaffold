import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOne(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  validateUserAndUpdateDeviceToken({
    userId,
    email,
    deviceToken,
  }: {
    userId: string;
    email: string;
    deviceToken: string;
  }) {
    return this.prisma.user.upsert({
      where: {
        id: userId,
      },
      update: {
        deviceToken,
      },
      create: {
        id: userId,
        email,
        deviceToken,
      },
    });
  }
  // findAll() {
  //   return `This action returns all user`
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`
  // }
  // update(id: string, updateUserInput: UserUpdateInput) {
  //   return `This action updates a #${id} user`
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
