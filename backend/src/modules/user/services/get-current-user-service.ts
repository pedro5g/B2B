import { NotFoundException } from '@/shared/exceptions';
import {
  GetCurrentUserDTO,
  GetCurrentUserReturnDTO,
} from '../domain/dtos/get-current-user-dto';
import { IUserRepository } from '../domain/repository/i-user-repository';

export class GetCurrentUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute({
    userId,
  }: GetCurrentUserDTO): Promise<GetCurrentUserReturnDTO | never> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...withoutPassword } = user;

    return { user: withoutPassword };
  }
}
