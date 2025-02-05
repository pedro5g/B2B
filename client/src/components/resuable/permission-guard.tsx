import React from "react";
import { PermissionType } from "@/constant";

type PermissionsGuardProps = {
  requiredPermission: PermissionType;
  children: React.ReactNode;
  showMessage?: boolean;
};

export const PermissionsGuard = ({
  requiredPermission,
  showMessage,
  children,
}: PermissionsGuardProps) => {
  return <></>;
};
