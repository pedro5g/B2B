import { IUserRepository } from '../../domain/repository/i-user-repository';
import { GetCurrentUserService } from '../../services/get-current-user-service';
import { PrismaUserRepository } from '../repository/prisma-user-repository';

const userRepository: IUserRepository = new PrismaUserRepository();

const getCurrentUserService = new GetCurrentUserService(userRepository);

export { getCurrentUserService };
