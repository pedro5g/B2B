import {
  CreateWorkspaceDTO,
  CreateWorkspaceReturnDTO,
} from '../domain/dtos/create-workspace-dto';
import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';

export class CreateWorkspaceService {
  constructor(private readonly workspaceRepository: IWorkspaceRepository) {}

  async execute(
    createArgs: CreateWorkspaceDTO,
  ): Promise<CreateWorkspaceReturnDTO> {
    const workspace = await this.workspaceRepository.create(createArgs);

    return { workspace };
  }
}
