import { PrismaClient } from "@prisma/client";
import { Curriculum, Technology, User } from "../../core/User/model/User";
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
    });
  }

  create({ name, email, password }: User): Promise<User> {
    return this.prisma.user.create({
      data: { name, email, password, updateAt: new Date() },
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
}
