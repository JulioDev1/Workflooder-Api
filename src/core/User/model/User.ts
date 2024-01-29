export type Number = {
  id?: string;
  ddd: string;
  number: string;
};

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  number: Number[];
  createAt?: Date;
  updateAt?: Date;
}
export interface Auth {
  email: string;
  password: string;
}

export type Technology = {
  id?: string;
  curriculumId?: string;
  name: string;
};
export interface Curriculum {
  id?: string;
  title: string;
  technology: Technology[];
  description: string;
  userId: string;
}
export interface CurriculumInput {
  id?: string;
  title: string;
  description: string;
  userId: string;
}
