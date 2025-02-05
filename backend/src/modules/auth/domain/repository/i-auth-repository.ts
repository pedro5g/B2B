import {
  RegisterAccountDTO,
  RegisterAccountReturnDTO,
} from '../dtos/register-account-dto';
import {
  RegisterUserDTO,
  RegisterUserReturnDTO,
} from '../dtos/register-user-dto';

export interface IAuthRepository {
  register(registerArgs: RegisterUserDTO): Promise<RegisterUserReturnDTO>;
  registerAccount(
    registerAccountArgs: RegisterAccountDTO,
  ): Promise<RegisterAccountReturnDTO>;
  getUserByEmail(email: string): Promise<RegisterAccountReturnDTO | null>;
}
