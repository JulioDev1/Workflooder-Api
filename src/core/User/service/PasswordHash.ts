import bcrypt from "bcrypt";

export class PasswordHash {
  async encrypt(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  }
  async comparePass(password: string, userPassword: string) {
    return await bcrypt.compare(password, userPassword);
  }
}
