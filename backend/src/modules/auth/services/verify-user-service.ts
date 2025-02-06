import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
} from '@/shared/exceptions';
import { IAuthRepository } from '../domain/repository/i-auth-repository';
import { comparPassword } from '@/shared/utils/bcrypt';
import {
  VerifyUserServiceDTO,
  VerifyUserServiceReturnDTO,
} from './dtos/verify-user-service-dto';
import { IWorkspaceRepository } from '@/modules/workspace/domain/repository/i-workspace-repository';

export class VerifyUserService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly workspaceRepository: IWorkspaceRepository,
  ) {}

  async execute({
    email,
    password,
  }: VerifyUserServiceDTO): Promise<VerifyUserServiceReturnDTO> {
    const user = await this.authRepository.getUserByEmail(email);

    if (!user || !user.password) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await comparPassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
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

    const {
      password: passwordHash,
      currentWorkspace,
      ...withoutPassword
    } = user;

    return {
      user: {
        ...withoutPassword,
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
