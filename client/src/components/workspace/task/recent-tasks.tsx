import { getAllTasksQueryFn } from "@/api/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  formatDate,
  getAvatarColor,
  getAvatarFallbackText,
  transformStatusEnum,
} from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const RecentTasks = () => {
  const workspaceId = useWorkspaceId();

  const { data, isLoading } = useQuery({
    queryKey: ["all-tasks", workspaceId],
    queryFn: () => getAllTasksQueryFn({ workspaceId }),
    staleTime: 0,
    enabled: !!workspaceId,
  });

  const tasks = data?.tasks || [];

  return (
    <div className="flex flex-col space-y-6">
      {isLoading && (
        <Loader className="size-8 animate-spin place-self-center" />
      )}

      {tasks.length === 0 ? (
        <div className="font-semibold text-sm text-muted-foreground text-center py-5">
          No Task Created yet
        </div>
      ) : (
        <ul role="list" className="divide-y divide-gray-200">
          {tasks.map((task) => {
            const name = task.assignedTo?.name || "";
            const initials = getAvatarFallbackText(name);
            const avatarColor = getAvatarColor(name);
            return (
              <li
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex flex-col space-y-1 flex-grow">
                  <span className="text-sm text-gray-600 font-medium">
                    {task.id}
                  </span>
                  <p className="text-md font-semibold text-gray-800 truncate">
                    {task.title}
                  </p>
                  <span className="text-sm text-gray-500">
                    Due: {formatDate(task.dueDate)}
                  </span>
                </div>

                {/* Task Status */}
                <div className="text-sm font-medium ">
                  <Badge
                    variant={TaskStatusEnum[task.status]}
                    className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0">
                    <span>{transformStatusEnum(task.status)}</span>
                  </Badge>
                </div>

                {/* Task Priority */}
                <div className="text-sm ml-2">
                  <Badge
                    variant={TaskPriorityEnum[task.priority]}
                    className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0">
                    <span>{transformStatusEnum(task.priority)}</span>
                  </Badge>
                </div>

                {/* Assignee */}
                <div className="flex items-center space-x-2 ml-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignedTo?.profilePictureUrl || ""}
                      alt={task.assignedTo?.name}
                    />
                    <AvatarFallback className={avatarColor}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
