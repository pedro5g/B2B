import { CreateWorkspaceForm } from "./create-workspace-form";
import { useCreateWorkspaceDialog } from "@/hooks/use-create-workspace-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
export const CreateWorkspaceDialog = () => {
  const { open, onClose } = useCreateWorkspaceDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl !p-0 overflow-hidden border-0">
        <CreateWorkspaceForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
