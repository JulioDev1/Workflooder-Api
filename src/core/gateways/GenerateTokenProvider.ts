import { sign } from "jsonwebtoken";
import { UseCase } from "../shared/useCase";
type userId = string;

export class GenerateTokenProvider implements UseCase<userId, string> {
  async execute(input: userId): Promise<string> {
    const token = await sign({}, "5b1305ce-2409-4370-bbe4-5b201de352d3", {
      subject: input,
      expiresIn: "20s",
    });
    return token;
  }
}
