import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TaskType } from "@/api/types/api-type";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskDialogProps {
  task: TaskType;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTaskDialog = ({
  task,
  isOpen,
  onClose,
}: EditTaskDialogProps) => {
  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={onClose}>
        <DialogTitle hidden>Edit task form</DialogTitle>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-lg max-h-auto my-5 border-0">
          <EditTaskForm onClose={onClose} task={task} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
