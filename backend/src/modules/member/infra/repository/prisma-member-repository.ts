import { prisma } from '@/shared/lib/prisma';
import { CreateMemberDTO } from '../../domain/dtos/create-member-dto';
import { IMember, IMemberWithRole } from '../../domain/models/i-member';
import { IMemberRepository } from '../../domain/repository/i-member-repository';
import { FindMemberDTO } from '../../domain/dtos/find-member-dto';
import { UpdateMemberDTO } from '../../domain/dtos/update-member-dto';
import { IUserWithRole } from '@/modules/user/domain/models/i-user-with-roles';

export class PrismaMemberRepository implements IMemberRepository {
  async create({
    workspaceId,
    userId,
    roleId,
  }: CreateMemberDTO): Promise<IMember> {
    const member = await prisma.member.create({
      data: {
        userId,
        workspaceId,
        roleId,
      },
    });

    return member;
  }

  async update({
    workspaceId,
    userId,
    roleId,
  }: UpdateMemberDTO): Promise<IMember> {
    const memberUpdated = await prisma.member.update({
      where: {
        userId_workspaceId: {
          workspaceId,
          userId,
        },
      },
      data: {
        roleId,
      },
    });

    return memberUpdated;
  }

  async findMember({
    userId,
    workspaceId,
  }: FindMemberDTO): Promise<IMemberWithRole | null> {
    const member = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
      select: {
        userId: true,
        workspaceId: true,
        joinAt: true,
        role: true,
      },
    });

    return member as IMemberWithRole;
  }

  async findMembersByWorkspaceId(
    workspaceId: string,
  ): Promise<IMemberWithRole[]> {
    const members = await prisma.member.findMany({
      where: {
        workspaceId,
      },
      select: {
        userId: true,
        workspaceId: true,
        joinAt: true,
        role: true,
      },
    });

    return members as IMemberWithRole[];
  }

  async getUsersWithRoleById(workspaceId: string): Promise<IUserWithRole[]> {
    const userWithRole = await prisma.member.findMany({
      where: { workspaceId },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePictureUrl: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return userWithRole;
  }
}
