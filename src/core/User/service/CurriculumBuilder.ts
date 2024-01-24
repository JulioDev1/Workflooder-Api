import { UseCase } from "src/core/shared/useCase";
import { Curriculum } from "../model/User";
import { RepositoryUser } from "./RegisterRepositoryUser";

export class CurriculumBuilder implements UseCase<Curriculum, Curriculum> {
  constructor(readonly repository: RepositoryUser) {}
  async execute({
    description,
    technology,
    title,
    userId,
  }: Curriculum): Promise<Curriculum> {
    const createCv = await this.repository.createCurriculum({
      description,
      technology,
      title,
      userId,
    });
    return createCv;
  }
}
