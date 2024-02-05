import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
import { Technology } from "../model/User";
type Input = {
  name: string;
  id: string;
};
export class UpdateTechnology implements UseCase<Input, Technology> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute({ name, id }: Input): Promise<Technology> {
    const findTechnology = await this.repository.findIdTechnology(id);

    if (!findTechnology) throw new Error("id not found");

    const updatedTechnology = await this.repository.updateTechnology({
      id: id,
      name: name,
    });

    return updatedTechnology;
  }
}
