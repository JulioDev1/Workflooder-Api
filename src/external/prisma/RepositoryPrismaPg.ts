import { PrismaClient } from "@prisma/client";
import {
  Curriculum,
  CurriculumInput,
  Message,
  Technology,
  User,
} from "../../core/User/model/User";
import { RepositoryUser } from "../../core/User/service/RegisterRepositoryUser";
import { RefreshToken } from "../../core/gateways/GenerateRefreshToken";

export default class RepositoryPrismaPg implements RepositoryUser {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: { number: true },
    });
  }

  create({
    name,
    email,
    password,
    number,
    act_area,
    role,
  }: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        act_area,
        role,
        updateAt: new Date(),
        number: {
          create: number.map((data) => ({
            ddd: data.ddd,
            number: data.number,
          })),
        },
      },

      include: { number: true },
    });
  }

  createRefreshToken({
    userId,
    expiresIn,
  }: RefreshToken): Promise<RefreshToken> {
    return this.prisma.refresh_Token.create({
      data: { userId, expiresIn },
    });
  }

  findRefreshToken(id: string) {
    return this.prisma.refresh_Token.findFirst({
      where: {
        id: id,
      },
    });
  }

  deleteSpiredToken(id: string) {
    return this.prisma.refresh_Token.deleteMany({
      where: {
        userId: id,
      },
    });
  }

  getUserProfile(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        number: true,
        act_area: true,
        role: true,
      },
    });
  }

  createCurriculum({
    title,
    technology,
    description,
    userId,
    salary,
    linkedin,
  }: Curriculum): Promise<Curriculum> {
    return this.prisma.curriculum.create({
      data: {
        title,
        technology: {
          createMany: {
            data: technology.map((tecs: Technology) => ({ name: tecs.name })),
          },
        },
        linkedin,
        salary,
        description,
        userId,
      },
      include: {
        technology: true,
      },
    });
  }

  getAllCurriculum(): Promise<Curriculum[]> {
    return this.prisma.curriculum.findMany({
      select: {
        title: true,
        technology: true,
        description: true,
        userId: true,
        salary: true,
        linkedin: true,
      },
    });
  }

  getUserCurriculum(id: string): Promise<Curriculum | null> {
    return this.prisma.curriculum.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        technology: true,
        description: true,
        userId: true,
        salary: true,
        linkedin: true,
      },
    });
  }

  getUserLoggedCurriculum(userId: string): Promise<Curriculum | null> {
    return this.prisma.curriculum.findFirst({
      where: {
        userId: userId,
      },
      select: {
        title: true,
        technology: true,
        description: true,
        userId: true,
        salary: true,
        linkedin: true,
      },
    });
  }

  getCurriculumById(id: string): Promise<Curriculum | null> {
    return this.prisma.curriculum.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        technology: true,
        description: true,
        userId: true,
        salary: true,
        linkedin: true,
      },
    });
  }

  updateUserCurriculum({
    description,
    title,
    linkedin,
    salary,
    userId,
    id,
  }: CurriculumInput): Promise<CurriculumInput> {
    return this.prisma.curriculum.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        userId,
        linkedin,
        salary,
      },
      include: {
        technology: true,
      },
    });
  }

  findIdTechnology(techId: string) {
    return this.prisma.technology.findUnique({
      where: {
        id: techId,
      },
    });
  }

  updateTechnology({ name, id }: Technology): Promise<Technology> {
    return this.prisma.technology.update({
      where: {
        id: id,
      },
      data: { name },
    });
  }

  createChat(senderId: string, receiverId: string) {
    return this.prisma.chat.create({
      data: {
        members: {
          connect: [{ id: senderId }, { id: receiverId }],
        },
        message: {
          create: [],
        },
      },
    });
  }

  chatExist(senderId: string, receiverId: string) {
    return this.prisma.chat.findFirst({
      where: {
        AND: [
          { members: { some: { id: senderId } } },
          { members: { some: { id: receiverId } } },
        ],
      },
    });
  }

  getChatMessage(id: string) {
    return this.prisma.chat.findUnique({
      where: {
        id: id,
      },
      include: {
        members: true,
        message: true,
      },
    });
  }
  createMessage({
    content,
    senderId,
    receiverId,
    chatId,
  }: Message): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
        chatId,
      },

      include: {
        sender: true,
        receiver: true,
      },
    });
  }
}
