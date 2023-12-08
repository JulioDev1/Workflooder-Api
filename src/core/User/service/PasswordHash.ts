import bcrypt from "bcrypt";

export class PasswordHash {
  async encrypt(password: string) {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  }
  async comparePass(password: string, userPassword: string) {
    const comparePassword = await bcrypt.compare(password, userPassword);
    if (!comparePassword) {
      throw new Error("password is incorrectly");
    }
  }
}
