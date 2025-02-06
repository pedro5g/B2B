import { PrismaAuthRepository } from '../repository/prisma-auth-repository';
import { LoginOrCreateAccountService } from '../../services/login-or-create-account-service';
import { RegisterUserService } from '../../services/register-user-service';
import { VerifyUserService } from '../../services/verify-user-service';
import { PrismaWorkspaceRepository } from '@/modules/workspace/infra/repository/prisma-workspace-repository';

const authRepository = new PrismaAuthRepository();
const workspaceRepository = new PrismaWorkspaceRepository();

const loginOrCreateAccountService = new LoginOrCreateAccountService(
  authRepository,
  workspaceRepository,
);
const registerUserService = new RegisterUserService(authRepository);
const verifyUserService = new VerifyUserService(
  authRepository,
  workspaceRepository,
);

export { loginOrCreateAccountService, registerUserService, verifyUserService };
