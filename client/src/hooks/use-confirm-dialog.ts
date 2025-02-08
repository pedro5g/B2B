import { parseAsBoolean, useQueryState } from "nuqs";
import { useState } from "react";

export const useConfirmDialog = <T = unknown>() => {
  const [open, setOpen] = useQueryState(
    "confirm-dialog",
    parseAsBoolean.withDefault(false)
  );
  const [context, setContext] = useState<T | null>(null);

  const onOpenDialog = (data?: T) => {
    setContext(data || null);
    setOpen(true);
  };

  const onCloseDialog = () => {
    setContext(null);
    setOpen(false);
  };

  return {
    open,
    context,
    onOpenDialog,
    onCloseDialog,
  };
};
