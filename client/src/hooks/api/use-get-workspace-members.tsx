import { getMembersInWorkspaceQueryFn } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceMembers = (workspaceId: string) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    staleTime: Infinity,
  });
};
