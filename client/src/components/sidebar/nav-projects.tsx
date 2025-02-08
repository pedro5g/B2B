import {
  ArrowRight,
  Folder,
  Loader,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCreateProjectDialog } from "@/hooks/use-create-project-dialog";
import { ConfirmDialog } from "../reusable/confirm-dialog";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { Button } from "../ui/button";
import { usePagination } from "@/hooks/use-pagination";
import { useGetProjectsInWorkspaceQuery } from "@/hooks/api/use-get-projects";
import { PaginationType, ProjectType } from "@/api/types/api-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectMutationFn } from "@/api/api";
import { PermissionsGuard } from "../reusable/permission-guard";
import { Permissions } from "@/constant";

export function NavProjects() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const { onOpen } = useCreateProjectDialog();
  const { context, open, onOpenDialog, onCloseDialog } =
    useConfirmDialog<ProjectType>();

  const [{ pageNumber, pageSize }, setPagination] = usePagination({
    initialPagaSize: 5,
  });
  const { isMobile } = useSidebar();

  const { data, isPending, isFetching, isError } =
    useGetProjectsInWorkspaceQuery({ workspaceId, pageSize, pageNumber });

  const projects = data?.projects || [];
  const pagination = data?.pagination || ({ totalPage: 1 } as PaginationType);
  const hasMore = pagination.totalPage > pageNumber;

  const fetchNextPage = () => {
    if (!hasMore || isFetching) return;
    // each click show more 5 projects in nav projects while totalPage > pageNumber
    setPagination("pageSize", pageSize + 5);
  };

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: deleteProjectMutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["all-projects", workspaceId],
      });
      window.toast({
        title: "Success",
        description: data.message,
        variant: "success",
      });
      navigate(`/workspace/${workspaceId}`);
      setTimeout(() => onCloseDialog(), 100);
    },
    onError: (error) => {
      console.log(error);
      window.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    if (!context) return;
    mutate({ workspaceId, projectId: context.id });
  };
  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="w-full justify-between pr-0">
          <span>Projects</span>
          <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
            <button
              onClick={onOpen}
              type="button"
              className="flex size-5 items-center justify-center rounded-full 
            border">
              <Plus className="size-3.5" />
            </button>
          </PermissionsGuard>
        </SidebarGroupLabel>
        <SidebarMenu className="h-[320px] scrollbar overflow-y-auto pb-2">
          {isError && <div>Error occurred</div>}
          {isPending && (
            <Loader className="size-5 animate-spin place-content-center" />
          )}
          {!isPending && projects.length === 0 ? (
            <div className="pl-3">
              <p className="text-xs text-muted-foreground">
                There is no projects in this Workspace yet. Projects you create
                will show up here.
              </p>
              <Button
                variant="link"
                type="button"
                className="h-0 p-0 text-[13px] underline font-semibold mt-4"
                onClick={onOpen}>
                Create a project
                <ArrowRight />
              </Button>
            </div>
          ) : (
            projects.map((item) => {
              const projectUrl = `/workspace/${workspaceId}/project/${item.id}`;

              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild isActive={projectUrl === pathname}>
                    <Link to={projectUrl}>
                      {item.emoji}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}>
                      <DropdownMenuItem
                        onClick={() => navigate(`${projectUrl}`)}>
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        disabled={isLoading}
                        onClick={() => onOpenDialog(item)}>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })
          )}

          {hasMore && (
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-sidebar-foreground/70"
                disabled={isFetching}
                onClick={fetchNextPage}>
                <MoreHorizontal className="text-sidebar-foreground/70" />
                <span>{isFetching ? "Loading..." : "More"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarGroup>

      <ConfirmDialog
        isOpen={open}
        isLoading={isLoading}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title="Delete Project"
        description={`Are you sure you want to delete ${
          context?.name || "this item"
        }? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
