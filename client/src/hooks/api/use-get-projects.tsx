import { getProjectsInWorkspaceQueryFn } from "@/api/api";
import { AllProjectPayloadType } from "@/api/types/api-type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetProjectsInWorkspaceQuery = ({
  workspaceId,
  pageSize,
  pageNumber,
  skip = false,
}: AllProjectPayloadType) => {
  return useQuery({
    queryKey: ["all-projects", workspaceId, pageNumber, pageSize],
    queryFn: () =>
      getProjectsInWorkspaceQueryFn({ workspaceId, pageSize, pageNumber }),
    staleTime: Infinity,
    placeholderData: skip ? undefined : keepPreviousData,
    enabled: !skip,
  });
};
