import { BadRequestException } from '@/shared/exceptions';
import { VerifyUserDTO } from '../domain/dtos/verify-user-dto';
import { IAuthRepository } from '../domain/repository/i-auth-repository';
import { comparPassword } from '@/shared/utils/bcrypt';

export class VerifyUserService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute({ email, password }: VerifyUserDTO) {
    const user = await this.authRepository.getUserByEmail(email);

    if (!user || !user.password) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await comparPassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const { password: passwordHash, ...withoutPassword } = user;

    return { user: withoutPassword };
  }
}
