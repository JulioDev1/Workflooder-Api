import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Curriculum, Technology } from "../model/User";
type Output = {
  title: string;
  description: string;
  userId: string;
  technology: Technology[];
};

export class GetUserCurriculumLogged
  implements UseCase<string, Curriculum | null>
{
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(userId: string): Promise<Curriculum | null> {
    return await this.repository.getUserLoggedCurriculum(userId);
  }
}
