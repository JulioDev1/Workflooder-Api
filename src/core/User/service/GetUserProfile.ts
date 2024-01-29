import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { User } from "../model/User";

export class GetUserProfile implements UseCase<string, User | null> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute(id: string): Promise<any | null> {
    return await this.repository.getUserProfile(id);
  }
}
