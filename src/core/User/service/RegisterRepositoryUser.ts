import { User } from "../model/User";

export interface RepositoryUser {
  findByEmail(email: string): Promise<User | null>;
  create({ name, email, password }: User): Promise<User>;
}
