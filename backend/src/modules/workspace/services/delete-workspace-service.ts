import { IWorkspaceRepository } from '../domain/repository/i-workspace-repository';
import { NotFoundException, UnauthorizedException } from '@/shared/exceptions';
import { IUserRepository } from '@/modules/user/domain/repository/i-user-repository';
import { DeleteWorkspaceDTO } from '../domain/dtos/delete-workspace-dto';
import { IWorkspace } from '../domain/models/i-workspace';

export class DeleteWorkspaceService {
  constructor(
    private readonly workspaceRepository: IWorkspaceRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, workspaceId }: DeleteWorkspaceDTO): Promise<void> {
    const workspaceFound = await this.workspaceRepository.findById(workspaceId);

    if (!workspaceFound) {
      throw new NotFoundException('Workspace not found');
    }

    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    if (workspaceFound.ownerId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this workspace',
      );
    }

    if (userFound.currentWorkspace === workspaceId) {
      const workspaces = await this.workspaceRepository.findWorkspacesByUserId(
        userId,
      );

      const newCurrentWorkspace = this.getFirstWorkspaceUnlikeCurrentWorkspace(
        userFound.currentWorkspace,
        workspaces,
      );

      await this.userRepository.update({
        ...userFound,
        currentWorkspace: newCurrentWorkspace?.id,
      });
    }

    await this.workspaceRepository.delete({ userId, workspaceId });
  }

  private getFirstWorkspaceUnlikeCurrentWorkspace(
    currentWorkspace: string,
    workspaces: IWorkspace[],
  ) {
    if (workspaces.length === 0) {
      return null;
    }
    for (const workspace of workspaces) {
      if (workspace.id !== currentWorkspace) {
        return workspace;
      }
    }
    return null;
  }
}
