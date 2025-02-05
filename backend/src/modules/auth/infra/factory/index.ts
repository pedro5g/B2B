import { PrismaAuthRepository } from '../repository/prisma-auth-repository';
import { LoginOrCreateAccountService } from '../../services/login-or-create-account-service';
import { RegisterUserService } from '../../services/register-user-service';
import { VerifyUserService } from '../../services/verify-user-service';

const authRepository = new PrismaAuthRepository();

const loginOrCreateAccountService = new LoginOrCreateAccountService(
  authRepository,
);
const registerUserService = new RegisterUserService(authRepository);
const verifyUserService = new VerifyUserService(authRepository);

export { loginOrCreateAccountService, registerUserService, verifyUserService };
