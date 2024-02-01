import { sign } from "jsonwebtoken";
import { UseCase } from "../shared/useCase";

export class GenerateTokenProvider implements UseCase<string, string> {
  async execute(input: string): Promise<string> {
    const token = await sign(
      { id: input },
      "5b1305ce-2409-4370-bbe4-5b201de352d3",
      {
        expiresIn: "1h",
      }
    );
    return token;
  }
}
