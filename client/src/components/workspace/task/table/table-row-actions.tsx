import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/reusable/confirm-dialog";
import { TaskType } from "@/api/types/api-type";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskMutationFn } from "@/api/api";
import { EditTaskDialog } from "../edit-task-dialog";
import { PermissionsGuard } from "@/components/reusable/permission-guard";
import { Permissions } from "@/constant";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();

  const taskId = row.original.id as string;
  const taskCode = row.original.taskCode;

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
      window.toast({
        title: "Susses",
        description: message,
        variant: "success",
      });
      setOpenDialog(false);
    },
    onError: (error) => {
      console.error(error);
      window.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    if (isPending) return;
    mutate({ workspaceId, taskId });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <PermissionsGuard
            requiredPermission={Permissions.EDIT_TASK}
            callback={
              <DropdownMenuItem disabled className="cursor-pointer">
                Edit Task
              </DropdownMenuItem>
            }>
            <DropdownMenuItem
              onClick={() => setOpenEditDialog(true)}
              className="cursor-pointer">
              Edit Task
            </DropdownMenuItem>
          </PermissionsGuard>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="!text-destructive cursor-pointer"
            onKeyDown={(e) => {
              if (e.ctrlKey && e.code === "Backspace") {
                e.preventDefault();
                setOpenDialog(true);
              }
            }}
            onClick={() => setOpenDialog(true)}>
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={false}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}`}
        confirmText="Delete"
        cancelText="Cancel"
      />
      <EditTaskDialog
        onClose={() => setOpenEditDialog(false)}
        isOpen={openEditDialog}
        task={row.original}
      />
    </>
  );
}
