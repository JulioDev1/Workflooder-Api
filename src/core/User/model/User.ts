export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createAt?: Date;
  updateAt?: Date;
}
export interface Auth {
  email: string;
  password: string;
}
