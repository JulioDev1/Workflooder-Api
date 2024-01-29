import { RefreshToken } from "src/core/gateways/GenerateRefreshToken";
import { Curriculum, CurriculumInput, User } from "../model/User";

export interface RepositoryUser {
  findByEmail(email: string): Promise<User | null>;
  create({ name, email, password, number }: User): Promise<User>;
  createRefreshToken({
    userId,
    expiresIn,
  }: RefreshToken): Promise<RefreshToken>;
  findRefreshToken(id: string): any;
  deleteSpiredToken(id: string): any;
  createCurriculum({
    title,
    technology,
    description,
    userId,
  }: Curriculum): Promise<Curriculum>;
  getAllCurriculum(): Promise<Curriculum[]>;
  getUserCurriculum(id: string): Promise<Curriculum | null>;
  getUserLoggedCurriculum(userId: string): Promise<Curriculum | null>;
  updateUserCurriculum({
    description,
    title,
    userId,
    id,
  }: Curriculum): Promise<CurriculumInput>;
}
