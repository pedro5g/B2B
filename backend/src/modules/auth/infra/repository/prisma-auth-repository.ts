import { IAuthRepository } from '../../domain/repository/i-auth-repository';
import {
  RegisterUserDTO,
  RegisterUserReturnDTO,
} from '../../domain/dtos/register-user-dto';
import { prisma } from '@/shared/lib/prisma';
import { ProviderEnum } from '@/shared/enums/account-provider';
import { generateInviteCode } from '@/shared/utils/uuid';
import { Roles } from '@/shared/enums/roles';
import {
  RegisterAccountDTO,
  RegisterAccountReturnDTO,
} from '../../domain/dtos/register-account-dto';

export class PrismaAuthRepository implements IAuthRepository {
  async register({
    name,
    email,
    password,
  }: RegisterUserDTO): Promise<RegisterUserReturnDTO> {
    const [userId, workspaceId] = await prisma.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      await trx.account.create({
        data: {
          userId: user.id,
          providerId: email,
          provider: ProviderEnum.EMAIL,
        },
      });

      const workspace = await trx.workspace.create({
        data: {
          name: 'My Workspace',
          description: `Workspace created for ${user.name}`,
          ownerId: user.id,
          inviteCode: generateInviteCode(),
        },
      });

      const ownerRole = await trx.role.findUnique({
        where: { name: Roles.OWNER },
      });

      if (!ownerRole) {
        console.error(
          `Ooh, something very wrong happened, ${Roles.OWNER} not found within database`,
        );
        throw new Error('Ooh, something very wrong happened');
      }

      await trx.member.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          roleId: ownerRole.id,
        },
      });

      await trx.user.update({
        where: { id: user.id },
        data: { currentWorkspace: workspace.id },
      });

      return [user.id, workspace.id];
    });
    return { userId, workspaceId };
  }

  async registerAccount({
    providerId,
    provider,
    displayName,
    email,
    picture,
  }: RegisterAccountDTO): Promise<RegisterAccountReturnDTO> {
    const [user] = await prisma.$transaction(async (trx) => {
      const user = await trx.user.create({
        data: { email, name: displayName, profilePictureUrl: picture },
      });

      await trx.account.create({
        data: {
          userId: user.id,
          provider: provider,
          providerId,
        },
      });

      const workspace = await trx.workspace.create({
        data: {
          name: `My Workspace`,
          description: `Workspace created for ${user.name}`,
          ownerId: user.id,
          inviteCode: generateInviteCode(),
        },
      });

      const ownerRole = await trx.role.findUnique({
        where: { name: Roles.OWNER },
      });

      if (!ownerRole) {
        console.error(
          `Ooh, something very wrong happened, ${Roles.OWNER} not found within database`,
        );
        throw new Error('Ooh, something very wrong happened');
      }

      await trx.member.create({
        data: {
          userId: user.id,
          workspaceId: workspace.id,
          roleId: ownerRole.id,
        },
      });

      const _user = await trx.user.update({
        where: { id: user.id },
        data: { currentWorkspace: workspace.id },
      });

      return [_user];
    });

    return user;
  }

  async getUserByEmail(
    email: string,
  ): Promise<RegisterAccountReturnDTO | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
