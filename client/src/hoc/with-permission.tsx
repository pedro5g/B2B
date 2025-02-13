import { PermissionType } from "@/constant";
import { useAuthContext } from "@/context/auth-provider";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//  Higher-Order Component  (hoc)
//  that component pattern creates a wrapper around another component and adds behaviors
//  in this case withPermission takes a WrappedComponent and checks if user has permission
//  if they don't have permission it redirects them and doesn't render the Wrapper component

export const withPermission = (
  WrappedComponent: React.ElementType,
  requiredPermissions: PermissionType
) => {
  const WithPermission = <P, Props = P>(props: Props) => {
    const { user, hasPermission, authLoading } = useAuthContext();
    const navigate = useNavigate();
    const workspaceId = useWorkspaceId();

    useEffect(() => {
      if (!user || !hasPermission(requiredPermissions)) {
        navigate(`/workspace/${workspaceId}`);
      }
    }, [user, hasPermission, navigate, workspaceId]);

    if (authLoading) {
      return <div>Loading...</div>;
    }

    if (!user || !hasPermission(requiredPermissions)) {
      return;
    }

    return <WrappedComponent {...props} />;
  };

  return WithPermission;
};
