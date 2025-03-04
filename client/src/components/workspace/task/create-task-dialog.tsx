import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTaskForm } from "./create-task-form";
import { useState } from "react";
import { PermissionsGuard } from "@/components/reusable/permission-guard";
import { Permissions } from "@/constant";

interface CreateTaskDialogProps {
  projectId?: string;
}

export const CreateTaskDialog = ({ projectId }: CreateTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle hidden>Create task form</DialogTitle>
        <PermissionsGuard
          requiredPermission={Permissions.CREATE_TASK}
          callback={<></>}>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              New Task
            </Button>
          </DialogTrigger>{" "}
        </PermissionsGuard>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-lg max-h-auto my-5 border-0">
          <CreateTaskForm onClose={onClose} projectId={projectId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
