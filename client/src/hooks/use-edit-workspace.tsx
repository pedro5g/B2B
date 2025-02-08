import { parseAsBoolean, useQueryState } from "nuqs";

export const useEditWorkspaceDialog = () => {
  const [open, setOpen] = useQueryState(
    "edit-workspace",
    parseAsBoolean.withDefault(false)
  );
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return {
    open,
    onOpen,
    onClose,
  };
};
