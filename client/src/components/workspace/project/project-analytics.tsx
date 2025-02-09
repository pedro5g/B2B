import { useQuery } from "@tanstack/react-query";
import { AnalyticsCard } from "../common/analytics-card";
import { getProjectAnalyticsQueryFn } from "@/api/api";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useParams } from "react-router-dom";

export const ProjectAnalytics = () => {
  const params = useParams();
  const workspaceId = useWorkspaceId();
  const projectId = params.projectId || "";

  const { data, isPending, isError } = useQuery({
    queryKey: ["project-analytics", workspaceId, projectId],
    queryFn: () => getProjectAnalyticsQueryFn({ workspaceId, projectId }),
    staleTime: 0, // staleTime tells you how fresh you data is. It is very similar to Cache-Control: max-age=120.
    enabled: !!projectId,
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        isLoading={isPending}
        title="Total Task"
        value={data.analytics.totalTasks || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Overdue Task"
        value={data.analytics.overdueTasks || 0}
      />
      <AnalyticsCard
        isLoading={isPending}
        title="Completed Task"
        value={data.analytics.completedTasks || 0}
      />
    </div>
  );
};
