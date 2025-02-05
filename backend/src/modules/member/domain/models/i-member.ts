import { RoleType } from '@/shared/enums/roles';

export interface IMember {
  userId: string;
  workspaceId: string;
  roleId: string;
  joinAt: Date | string;
}

export interface IMemberWithRole {
  userId: string;
  workspaceId: string;
  joinAt: Date | string;
  role: {
    id: string;
    name: RoleType;
    permissions: string[];
  };
}
