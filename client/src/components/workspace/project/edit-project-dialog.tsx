import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditProjectForm } from "./edit-project-form";
import { ProjectType } from "@/api/types/api-type";
import { useEditProjectDialog } from "@/hooks/use-edit-project-dialog";

interface EditProjectDialogProps {
  project: ProjectType;
}

export const EditProjectDialog = ({ project }: EditProjectDialogProps) => {
  const { open, onClose } = useEditProjectDialog();

  return (
    <div>
      <Dialog modal={true} open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg border-0 rounded-md">
          <EditProjectForm project={project} onClose={onClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
