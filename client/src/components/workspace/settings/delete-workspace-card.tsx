import { deleteWorkspaceMutationFn } from "@/api/api";
import { ConfirmDialog } from "@/components/reusable/confirm-dialog";
import { PermissionsGuard } from "@/components/reusable/permission-guard";
import { Button } from "@/components/ui/button";
import { Permissions } from "@/constant";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteWorkspaceCardProps {
  workspaceId: string;
}

export const DeleteWorkspaceCard = ({
  workspaceId,
}: DeleteWorkspaceCardProps) => {
  const queryClient = useQueryClient();
  const { open, onOpenDialog, onCloseDialog } = useConfirmDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkspaceMutationFn,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-workspaces"],
      });

      window.toast({
        title: "Success",
        description: message,
        variant: "success",
      });

      onCloseDialog();
    },
    onError: (err) => {
      console.error(err);
      window.toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    if (isPending) return;
    mutate(workspaceId);
  };
  return (
    <>
      <div className="w-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left">
            Delete Workspace
          </h1>
        </div>

        <div className="flex flex-col items-start justify-between py-0">
          <div className="flex-1 mb-2">
            <p>
              Deleting a workspace is a permanent action and cannot be undone.
              Once you delete a workspace, all its associated data, including
              projects, tasks, and member roles, will be permanently removed.
              Please proceed with caution and ensure this action is intentional.
            </p>
          </div>
          <PermissionsGuard
            requiredPermission={Permissions.DELETE_WORKSPACE}
            callback={
              <Button
                disabled
                className="shrink-0 flex place-self-end h-[40px]"
                variant="destructive"
                title="you don't have permission to delete">
                Delete Workspace
              </Button>
            }>
            <Button
              disabled={isPending}
              className="shrink-0 flex place-self-end h-[40px]"
              variant="destructive"
              onClick={onOpenDialog}>
              Delete Workspace
            </Button>
          </PermissionsGuard>
        </div>
      </div>

      <ConfirmDialog
        isOpen={open}
        isLoading={isPending}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title={`Delete Test co Workspace`}
        description={`Are you sure you want to delete? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};
