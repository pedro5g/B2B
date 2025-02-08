import { UserType, WorkspaceWithMembersType } from "@/api/types/api-type";
import { PermissionType } from "@/constant";
import { useEffect, useMemo, useState } from "react";

export const usePermissions = (
  user?: UserType,
  workspace?: WorkspaceWithMembersType
) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (user && workspace) {
      const member = workspace.members.find(
        (member) => member.userId === user.id
      );
      if (member) {
        setPermissions(member.role.permissions || []);
      }
    }
  }, [user, workspace]);

  return useMemo(() => permissions, [permissions]);
};
