import { PrismaClient } from "@prisma/client";
import { User } from "../../core/User/model/User";
import { RepositoryUser } from "../../core/User/service/RegisterRepositoryUser";

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
    });
  }
}
