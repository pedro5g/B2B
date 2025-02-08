import { createContext, useContext, useEffect } from "react";
import { useAuth } from "@/hooks/api/use-auth";
import { UserType, WorkspaceType } from "@/api/types/api-type";
import { useGetWorkspaceQuery } from "@/hooks/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useNavigate } from "react-router-dom";
import { usePermissions } from "@/hooks/use-permissions";
import { PermissionType } from "@/constant";

// Define the context shape
type AuthContextType = {
  user?: UserType;
  workspace?: WorkspaceType;
  error: unknown;
  authLoading: boolean;
  workspaceLoading: boolean;
  isFetching: boolean;
  authRefetch: () => void;
  refetchWorkspace: () => void;
  hasPermission: (permission: PermissionType) => boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const workspaceId = useWorkspaceId();

  const {
    data: authData,
    error: authError,
    isLoading: authLoading,
    isFetching,
    refetch: authRefetch,
  } = useAuth();

  const user = authData?.user;

  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
    refetch: refetchWorkspace,
  } = useGetWorkspaceQuery(workspaceId);

  const workspace = workspaceData?.workspace;

  useEffect(() => {
    if (workspaceError) {
      if (workspaceError?.errorCode === "ACCESS_UNAUTHORIZED") {
        navigate("/"); // Redirect if the user is not a member of the workspace
      }
    }
  }, [navigate, workspaceError]);

  const permissions = usePermissions(user, workspace);

  const hasPermission = (permission: PermissionType) =>
    permissions.includes(permission);

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        error: authError || workspaceError,
        authLoading,
        workspaceLoading,
        isFetching,
        authRefetch,
        refetchWorkspace,
        hasPermission,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
