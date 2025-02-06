import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';
import { IAuthRepository } from '../domain/repository/i-auth-repository';
import {
  InternalServerException,
  NotFoundException,
} from '@/shared/exceptions';
import {
  LoginOrCreateAccountServiceDTO,
  LoginOrCreateAccountServiceReturnDTO,
} from './dtos/login-or-create-account-service-dto';

export class LoginOrCreateAccountService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute({
    displayName,
    provider,
    providerId,
    email,
    picture,
  }: LoginOrCreateAccountServiceDTO): Promise<LoginOrCreateAccountServiceReturnDTO> {
    let user = email ? await this.authRepository.getUserByEmail(email) : null;

    if (!user) {
      user = await this.authRepository.registerAccount({
        displayName,
        provider,
        providerId,
        email,
        picture,
      });
    }

    if (!user.currentWorkspace) {
      throw new InternalServerException(
        `Current workspace is null on user: ${user.id}`,
      );
    }

    const workspace = await this.workspaceRepository.findById(
      user.currentWorkspace,
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const { password, currentWorkspace, ...rest } = user;

    return {
      user: {
        ...rest,
        currentWorkspace: {
          id: workspace.id,
          name: workspace.name,
          inviteCode: workspace.inviteCode,
          ownerId: workspace.ownerId,
        },
      },
    };
  }
}
