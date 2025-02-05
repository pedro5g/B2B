import { RolePermissions } from '@/shared/utils/role-permission';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Initialized seed...');

  await prisma.$transaction(async (trx) => {
    await trx.role.deleteMany();
    for (const roleName in RolePermissions) {
      const permissions =
        RolePermissions[roleName as keyof typeof RolePermissions];
      await trx.role.create({
        data: {
          name: roleName,
          permissions: permissions,
        },
      });
    }
  });

  console.log('Db seeded successfully 🎉🌱');
}

main()
  .catch((err) => {
    console.error('failed to seed db ❌ ', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Db disconnected successfully ✅');
    process.exit(0);
  });
