import { prisma } from '@/shared/lib/prisma';
import { CreateRoleDTO } from '../../domain/dtos/create-role-dto';
import { IRole } from '../../domain/models/i-role';
import { IRoleRepository } from '../../domain/repository/i-role-repository';

export class PrismaRoleRepository implements IRoleRepository {
  async create({ name, permissions }: CreateRoleDTO): Promise<IRole> {
    const role = await prisma.role.create({
      data: {
        name,
        permissions,
      },
    });
    return role;
  }

  async delete(roleId: string): Promise<void> {
    await prisma.role.delete({ where: { id: roleId } });
  }

  async findById(roleId: string): Promise<IRole | null> {
    const role = await prisma.role.findUnique({ where: { id: roleId } });

    return role;
  }

  async findByName(name: string): Promise<IRole | null> {
    const role = await prisma.role.findUnique({ where: { name } });

    return role;
  }

  async findAll(): Promise<IRole[]> {
    const role = await prisma.role.findMany();

    return role;
  }
}
