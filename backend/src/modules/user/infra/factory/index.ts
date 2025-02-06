import { IUserRepository } from '../../domain/repository/i-user-repository';
import { GetCurrentUserService } from '../../services/get-current-user-service';
import { PrismaUserRepository } from '../repository/prisma-user-repository';
import { PrismaWorkspaceRepository } from '@/modules/workspace/infra/repository/prisma-workspace-repository';

const userRepository: IUserRepository = new PrismaUserRepository();
const workspaceRepository = new PrismaWorkspaceRepository();

const getCurrentUserService = new GetCurrentUserService(
  userRepository,
  workspaceRepository,
);

export { getCurrentUserService };
