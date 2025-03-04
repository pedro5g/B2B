import { PermissionType } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";

type PermissionsGuardProps = {
  requiredPermission: PermissionType;
  children: React.ReactNode;
  callback?: React.ReactNode;
};

export const PermissionsGuard = ({
  requiredPermission,
  callback,

  children,
}: PermissionsGuardProps) => {
  const { hasPermission } = useAuthContext();

  if (!hasPermission(requiredPermission)) {
    return callback ? (
      callback
    ) : (
      <div className="text-center text-sm pt-3 italic w-full text-muted-foreground">
        You do not have the permission to view this
      </div>
    );
  }

  return <>{children}</>;
};
