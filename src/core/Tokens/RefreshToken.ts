import { PrismaClient } from "@prisma/client";
import { UseCase } from "../shared/useCase";
import { GenerateTokenProvider } from "../gateways/GenerateTokenProvider";
import dayjs from "dayjs";
import {
  GenerateRefreshTokens,
  RefreshToken,
} from "../gateways/GenerateRefreshToken";
import RepositoryPrismaPg from "src/external/prisma/RepositoryPrismaPg";

type token = {
  token: string;
  refreshToken?: Promise<RefreshToken>;
};
export class RefreshTokenUser implements UseCase<string, any> {
  constructor(readonly repository: RepositoryPrismaPg) {}

  async execute(input: string): Promise<any> {
    const refreshToken = await this.repository.findRefreshToken(input);

    if (!refreshToken) throw new Error("token is invalid ");

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateTokenProvider = new GenerateTokenProvider();

    const token = await generateTokenProvider.execute(refreshToken.id);

    if (refreshTokenExpired) {
      await this.repository.deleteSpiredToken(refreshToken.userId);

      const generateRefreshTokenProvider = new GenerateRefreshTokens();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      );
      return { token, refreshToken: newRefreshToken };
    }
    return { token };
  }
}
