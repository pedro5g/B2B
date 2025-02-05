import { prisma } from '@/shared/lib/prisma';
import { CreateWorkspaceDTO } from '../../domain/dtos/create-workspace-dto';
import { IWorkspaceRepository } from '../../domain/repository/i-workspace-repository';
import { IWorkspace } from '../../domain/models/i-workspace';
import { generateInviteCode } from '@/shared/utils/uuid';
import { Roles } from '@/shared/enums/roles';
import { UpdateWorkspaceDTO } from '../../domain/dtos/update-workspace-dto';
import { DeleteWorkspaceDTO } from '../../domain/dtos/delete-workspace-dto';
import { IMember } from '@/modules/member/domain/models/i-member';

export class PrismaWorkspaceRepository implements IWorkspaceRepository {
  async create({
    name,
    description,
    ownerId,
  }: CreateWorkspaceDTO): Promise<IWorkspace> {
    const [workspace] = await prisma.$transaction(async (trx) => {
      const workspace = await trx.workspace.create({
        data: {
          name,
          description,
          inviteCode: generateInviteCode(),
          ownerId,
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
          userId: ownerId,
          roleId: ownerRole?.id,
          workspaceId: workspace.id,
        },
      });

      return [workspace];
    });

    return workspace;
  }

  async update({
    workspaceId,
    name,
    description,
  }: UpdateWorkspaceDTO): Promise<IWorkspace> {
    const updatedWorkspace = await prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        name,
        description,
      },
    });

    return updatedWorkspace;
  }

  async delete({ userId, workspaceId }: DeleteWorkspaceDTO): Promise<void> {
    await prisma.$transaction(async (trx) => {
      await trx.project.deleteMany({ where: { workspaceId } });
      await trx.task.deleteMany({ where: { workspaceId } });
      await trx.member.deleteMany({ where: { workspaceId } });
      await trx.workspace.delete({
        where: { id: workspaceId, AND: { ownerId: userId } },
      });
    });
  }

  async findWorkspacesByUserId(userId: string): Promise<IWorkspace[]> {
    const workspaces = await prisma.workspace.findMany({
      where: {
        Member: {
          every: {
            userId,
          },
        },
      },
    });

    return workspaces;
  }

  async findMemberByUserId(userId: string): Promise<IMember[]> {
    const members = await prisma.member.findMany({ where: { userId } });
    return members;
  }
  async findByInviteCode(inviteCode: string): Promise<IWorkspace | null> {
    const workspace = await prisma.workspace.findUnique({
      where: {
        inviteCode,
      },
    });

    return workspace;
  }

  async findById(id: string): Promise<IWorkspace | null> {
    const workspace = await prisma.workspace.findUnique({ where: { id } });
    return workspace;
  }
}
