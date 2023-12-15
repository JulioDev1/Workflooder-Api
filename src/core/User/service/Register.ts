import { UseCase } from "src/core/shared/useCase";
import { RepositoryUser } from "./RegisterRepositoryUser";
import { PasswordHash } from "./PasswordHash";

export type Input = {
  name: string;
  email: string;
  password: string;
};
export class Register implements UseCase<Input, Input> {
  private encrypt: PasswordHash;
  constructor(readonly repository: RepositoryUser) {
    this.encrypt = new PasswordHash();
  }

  async execute({ name, email, password }: Input): Promise<Input> {
    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) throw new Error("user already exists");

    const hashed = await this.encrypt.encrypt(password);
    const user = await this.repository.create({
      name,
      email,
      password: hashed,
    });

    return user;
  }
}
