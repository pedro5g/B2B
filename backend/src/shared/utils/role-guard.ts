import { PermissionType } from '../enums/roles';
import { UnauthorizedException } from '../exceptions';
import { RolePermissions } from './role-permission';

export const roleGuard = (
  role: keyof typeof RolePermissions,
  requiredPermissions: PermissionType[],
) => {
  // get all permissions by role name
  const permissions = RolePermissions[role];

  const hasPermission = requiredPermissions.every((permission) => {
    return permissions.includes(permission);
  });
  // if the role doesn't exist or lacks required permissions, throw an exception
  if (!hasPermission) {
    throw new UnauthorizedException(
      'You do not have the necessary permissions to perform this action',
    );
  }
};
