import { prisma } from '@/shared/lib/prisma';
import { CreateUserDTO } from '../../domain/dtos/create-user-dto';
import { IUserRepository } from '../../domain/repository/i-user-repository';
import { IUser } from '../../domain/models/i-user';
import { UpdateUserDTO } from '../../domain/dtos/update-user-dto';
import { IUserWithRole } from '../../domain/models/i-user-wtih-roles';
import { IUserPresenter } from '../../domain/models/i-user-presenter';

export class PrismaUserRepository implements IUserRepository {
  async create({
    name,
    email,
    password,
    isActive,
    profilePictureUrl,
  }: CreateUserDTO): Promise<{ userId: string }> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        isActive,
        profilePictureUrl,
      },
      select: { id: true },
    });

    return { userId: user.id };
  }

  async update({
    id,
    name,
    profilePictureUrl,
    isActive,
    currentWorkspace,
    lastLogin,
  }: UpdateUserDTO): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        profilePictureUrl,
        isActive,
        currentWorkspace,
        lastLogin,
      },
    });
  }

  async findUserByWorkspaceId(workspaceId: string): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: {
        Member: {
          every: {
            workspaceId,
          },
        },
      },
    });

    return users;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = prisma.user.findUnique({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<IUserPresenter | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });

    return user;
  }

  async findManyByIds(ids: string[]): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: { id: { in: ids } },
    });
    return users;
  }
}
