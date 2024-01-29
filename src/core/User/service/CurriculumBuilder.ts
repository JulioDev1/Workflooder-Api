import { UseCase } from "../../../core/shared/useCase";
import { Curriculum, Technology } from "../model/User";
import { RepositoryUser } from "./RegisterRepositoryUser";

type Input = {
  description: string;
  technology: Technology[];
  title: string;
  userId: string;
};

export class CurriculumBuilder implements UseCase<Curriculum, Curriculum> {
  constructor(readonly repository: RepositoryUser) {}

  async execute({
    description,
    technology: [{ name }],
    title,
    userId,
  }: Input): Promise<Curriculum> {
    const createCv = await this.repository.createCurriculum({
      description,
      technology: [{ name }],
      title,
      userId,
    });
    return createCv;
  }
}
