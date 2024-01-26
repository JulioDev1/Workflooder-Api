import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Technology } from "../model/User";
type Output = {
  title: string;
  description: string;
  userId: string;
  technology: Technology[];
};

export class GetUserCurriculum implements UseCase<string, Output | null> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(id: string): Promise<Output | null> {
    return await this.repository.getUserCurriculum(id);
  }
}
