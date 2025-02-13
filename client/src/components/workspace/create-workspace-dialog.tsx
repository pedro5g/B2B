import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceDialog } from "@/hooks/use-create-workspace-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
export const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogTitle hidden>Create workspace form</DialogTitle>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        <CreateWorkspaceForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
