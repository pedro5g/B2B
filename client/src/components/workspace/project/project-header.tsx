import { useParams } from "react-router-dom";
import { CreateTaskDialog } from "../task/create-task-dialog";
import { EditProjectDialog } from "./edit-project-dialog";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjectByIdQueryFn } from "@/api/api";
import { PermissionsGuard } from "@/components/reusable/permission-guard";
import { Permissions } from "@/constant";
import { Edit3 } from "lucide-react";
import { useEditProjectDialog } from "@/hooks/use-edit-project-dialog";

export const ProjectHeader = () => {
  const param = useParams();
  const workspaceId = useWorkspaceId();
  const projectId = param.projectId || "";

  const { onOpen } = useEditProjectDialog();

  const { data, isPending, isError } = useQuery({
    queryKey: ["project", projectId, workspaceId],
    queryFn: () => getProjectByIdQueryFn({ workspaceId, projectId }),
    staleTime: Infinity,
    enabled: !!projectId,
    placeholderData: keepPreviousData,
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Error occurred</span>;

  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="flex items-center gap-3 text-xl font-medium truncate tracking-tight">
          <span>{data.project.emoji}</span>
          {data.project.name}
        </h2>
        <PermissionsGuard
          requiredPermission={Permissions.EDIT_PROJECT}
          callback={
            <button
              disabled
              className="opacity-40"
              title="you don't have permission to edit">
              <Edit3 className="w-5 h-5" />
            </button>
          }>
          <button onClick={onOpen}>
            <Edit3 className="w-5 h-5" />
          </button>
          <EditProjectDialog project={data.project} />
        </PermissionsGuard>
      </div>
      <CreateTaskDialog projectId={projectId} />
    </div>
  );
};
