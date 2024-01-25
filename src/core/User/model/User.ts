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

type Number = {
  id?: string;
  ddd: string;
  number: string;
};

export type Technology = {
  name: string;
};
export interface Curriculum {
  id?: string;
  title: string;
  technology: Technology[];
  description: string;
  userId: string;
}
