import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Technology } from "../model/User";

type Output = {
  title: string;
  description: string;
  userId: string;
  technology: Technology[];
};

export class GetAllCurriculum implements UseCase<void, Output[]> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(): Promise<Output[]> {
    return await this.repository.getAllCurriculum();
  }
}
