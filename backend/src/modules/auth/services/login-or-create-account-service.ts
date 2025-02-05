import { RegisterAccountDTO } from '../domain/dtos/register-account-dto';
import { IAuthRepository } from '../domain/repository/i-auth-repository';

export class LoginOrCreateAccountService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute({
    displayName,
    provider,
    providerId,
    email,
    picture,
  }: RegisterAccountDTO) {
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

    const { password, ...withoutPassword } = user;

    return { user: withoutPassword };
  }
}
