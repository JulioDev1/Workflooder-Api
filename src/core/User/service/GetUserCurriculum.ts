import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Curriculum } from "../model/User";

export class GetUserCurriculum implements UseCase<string, Curriculum | null> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(id: string): Promise<Curriculum | null> {
    const curriculum = await this.repository.getUserCurriculum(id);
    if (!curriculum) {
      throw new Error(`Could not find curriculum`);
    }
    return curriculum;
  }
}
