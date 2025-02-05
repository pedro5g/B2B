import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import {
  UpdateWorkspaceDTO,
  UpdateWorkspaceReturnDTO,
} from '../domain/dtos/update-workspace-dto';
import { NotFoundException } from '@/shared/exceptions';

export class UpdateWorkspaceService {
  constructor(private readonly workspaceRepository: IWorkspaceRepository) {}

  async execute(
    updateArgs: UpdateWorkspaceDTO,
  ): Promise<UpdateWorkspaceReturnDTO> {
    const workspaceFound = await this.workspaceRepository.findById(
      updateArgs.workspaceId,
    );

    if (!workspaceFound) {
      throw new NotFoundException('Workspace not found');
    }

    const workspace = await this.workspaceRepository.update(updateArgs);

    return { workspace };
  }
}
