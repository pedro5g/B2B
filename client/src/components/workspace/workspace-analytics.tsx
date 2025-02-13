import { useQuery } from "@tanstack/react-query";
import { AnalyticsCard } from "./common/analytics-card";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { getWorkspaceAnalyticsQueryFn } from "@/api/api";

export const WorkspaceAnalytics = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: () => getWorkspaceAnalyticsQueryFn(workspaceId),
  });

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        isLoading={isLoading}
        title="Total tasks"
        value={data?.analytics.totalTasks || 0}
      />
      <AnalyticsCard
        isLoading={isLoading}
        title="Overdue Task"
        value={data?.analytics.overdueTasks || 0}
      />
      <AnalyticsCard
        isLoading={isLoading}
        title="Completed Task"
        value={data?.analytics.completedTasks || 0}
      />
    </div>
  );
};
