import { UseCase } from "../../../core/shared/useCase";
import { Auth } from "../model/User";
import { PasswordHash } from "./PasswordHash";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { sign } from "jsonwebtoken";

type Token = {
  token: string;
};

export class Authenticate implements UseCase<Auth, Token> {
  readonly encrypt: PasswordHash;
  constructor(readonly repository: RepositoryPrismaPg) {
    this.encrypt = new PasswordHash();
  }
  async execute({ email, password }: Auth): Promise<Token> {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new Error("password or email incorrectly");

    const verify = await this.encrypt.comparePass(password, user.password);

    if (!verify) throw new Error("password or email incorrectly");

    const token = sign({}, "5b1305ce-2409-4370-bbe4-5b201de352d3", {
      subject: user.id,
      expiresIn: "1h",
    });
    return { token };
  }
}
