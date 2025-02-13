import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CreateProjectForm from "@/components/workspace/project/create-project-form";
import { useCreateProjectDialog } from "@/hooks/use-create-project-dialog";

export const CreateProjectDialog = () => {
  const { open, onClose } = useCreateProjectDialog();
  return (
    <div>
      <Dialog modal={true} open={open} onOpenChange={onClose}>
        <DialogTitle hidden>Create Project Form</DialogTitle>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-lg border-0 rounded-md">
          <CreateProjectForm onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
