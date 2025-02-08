import { CustomError } from "@/@types/custom-error";
import { getWorkspaceByIdQueryFn } from "@/api/api";
import { WorkspaceByIdResponseType } from "@/api/types/api-type";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceQuery = (workspaceId: string) => {
  return useQuery<WorkspaceByIdResponseType, CustomError>({
    queryKey: ["workspace-id", workspaceId],
    queryFn: () => getWorkspaceByIdQueryFn(workspaceId),
    staleTime: 0,
    retry: 2,
    enabled: !!workspaceId,
  });
};
