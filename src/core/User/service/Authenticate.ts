import { UseCase } from "../../../core/shared/useCase";
import { Auth } from "../model/User";
import { PasswordHash } from "./PasswordHash";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import {
  GenerateRefreshTokens,
  RefreshToken,
} from "../../../core/gateways/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../core/gateways/GenerateTokenProvider";

type Output = {
  token: string;
  refreshToken: RefreshToken;
};

export class Authenticate implements UseCase<Auth, Output> {
  readonly encrypt: PasswordHash;

  constructor(readonly repository: RepositoryPrismaPg) {
    this.encrypt = new PasswordHash();
  }
  async execute({ email, password }: Auth): Promise<Output> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new Error("password or email incorrectly");

    const verify = await this.encrypt.comparePass(password, user.password);

    if (!verify) throw new Error("password or email incorrectly");

    const generateTokenProvider = new GenerateTokenProvider();

    const generateRefreshToken = new GenerateRefreshTokens();

    await this.repository.deleteSpiredToken(user.id!);

    const refreshToken = await generateRefreshToken.execute(user.id!);

    const token = await generateTokenProvider.execute(user.id!);

    return { token, refreshToken };
  }
}
