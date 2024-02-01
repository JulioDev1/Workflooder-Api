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
  act_area: string;
  role: string;
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
  linkedin: string;
  salary: number;
  description: string;
  userId: string;
}
export interface CurriculumInput {
  id?: string;
  title: string;
  description: string;
  linkedin: string;
  salary: number;
  userId: string;
}
