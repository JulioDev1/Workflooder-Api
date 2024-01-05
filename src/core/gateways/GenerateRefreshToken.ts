import dayjs from "dayjs";
import { UseCase } from "../shared/useCase";
import { PrismaClient } from "@prisma/client";

export type RefreshToken = {
  id: string;
  expiresIn: number;
  userId: string;
};

type userId = string;

export class GenerateRefreshTokens implements UseCase<userId, RefreshToken> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, "second").unix();

    const generateRefreshTokens = await this.prisma.refresh_Token.create({
      data: {
        userId,
        expiresIn: expiresIn,
      },
    });
    return generateRefreshTokens;
  }
}
