import { RoleType } from '@/shared/enums/roles';

export interface GetWorkspaceMembersServiceDTO {
  workspaceId: string;
}

export interface GetWorkspaceMembersServiceReturnDTO {
  members: {
    workspaceId: string;
    user: {
      id: string;
      name: string;
      email: string | null;
      profilePictureUrl: string | null;
    };
    role: {
      id: string;
      name: string;
    };
    joinAt: string | Date;
  }[];
  roles: {
    id: string;
    name: string;
  }[];
}
