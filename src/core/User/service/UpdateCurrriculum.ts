import { UseCase } from "../../../core/shared/useCase";
import RepositoryPrismaPg from "../../../external/prisma/RepositoryPrismaPg";
type Input = {
  title: string;
  id: string;
  description: string;
  linkedin: string;
  salary: number;
  userId: string;
  name: string;
};

export class UpdateCurriculum implements UseCase<Input, any> {
  constructor(readonly repository: RepositoryPrismaPg) {}
  async execute({
    title,
    description,
    userId,
    name,
    id,
    salary,
    linkedin,
  }: Input) {
    const findCurriculum = await this.repository.getCurriculumById(id);

    if (!findCurriculum) throw new Error("Curriculum not found");

    const updatedCurriculum = await this.repository.updateUserCurriculum({
      id: id,
      title: title,
      description: description,
      salary: salary,
      linkedin: linkedin,
      userId,
    });

    const updatedTechnologies = await this.repository.updateTechnology({
      curriculumId: id,
      name: name,
    });

    return { updatedCurriculum, updatedTechnologies };
  }
}
