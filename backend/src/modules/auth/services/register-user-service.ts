import { BadRequestException } from '@/shared/exceptions';
import { hashPassword } from '@/shared/utils/bcrypt';
import { IAuthRepository } from '../domain/repository/i-auth-repository';
import { RegisterUserDTO } from '../domain/dtos/register-user-dto';

export class RegisterUserService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute({ name, email, password }: RegisterUserDTO) {
    const userExists = await this.authRepository.getUserByEmail(email);

    if (userExists) {
      throw new BadRequestException('User already exists with this email');
    }

    const passwordHashed = await hashPassword(password);

    await this.authRepository.register({
      name,
      email,
      password: passwordHashed,
    });
  }
}
