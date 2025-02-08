import { parseAsBoolean, useQueryState } from "nuqs";

export const useEditProjectDialog = () => {
  const [open, setOpen] = useQueryState(
    "edit-project",
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
