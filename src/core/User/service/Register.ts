import { UseCase } from "../../shared/useCase";
import { Number } from "../model/User";
import { PasswordHash } from "./PasswordHash";
import { RepositoryUser } from "./RegisterRepositoryUser";

export type Input = {
  name: string;
  email: string;
  password: string;
  number: Number[];
};
export class Register implements UseCase<Input, Input> {
  private encrypt: PasswordHash;
  constructor(readonly repository: RepositoryUser) {
    this.encrypt = new PasswordHash();
  }

  async execute({
    name,
    email,
    password,
    number: [{ ddd, number }],
  }: Input): Promise<Input> {
    const emailExists = await this.repository.findByEmail(email);

    if (emailExists) throw new Error("user already exists");

    const hashed = await this.encrypt.encrypt(password);
    const user = await this.repository.create({
      name,
      email,
      password: hashed,
      number: [{ ddd, number }],
    });

    return user;
  }
}
