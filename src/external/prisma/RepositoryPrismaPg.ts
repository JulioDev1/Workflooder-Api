import { PrismaClient } from "@prisma/client";
import {
  Curriculum,
  CurriculumInput,
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

  create({ name, email, password, number }: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
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
        name: true,
        email: true,
        password: false,
        number: true,
      },
    });
  }

  createCurriculum({
    title,
    technology,
    description,
    userId,
  }: Curriculum): Promise<Curriculum> {
    return this.prisma.curriculum.create({
      data: {
        title,
        technology: {
          createMany: {
            data: technology.map((tecs: Technology) => ({ name: tecs.name })),
          },
        },

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
      },
    });
  }

  updateUserCurriculum({
    description,
    title,
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
      },
      include: {
        technology: true,
      },
    });
  }
  updateTechnology({ curriculumId, name }: Technology): Promise<any> {
    return this.prisma.technology.updateMany({
      where: { curriculumId },
      data: { name },
    });
  }
}
