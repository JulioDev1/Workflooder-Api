import { User } from "@prisma/client";
import { Auth } from "../model/User";

export interface AuthRepositoryUser {
  findEmail({ email, password }: Auth): Promise<User>;
  passwordIncorrectly(passoword: string): Promise<null | User>;
}
