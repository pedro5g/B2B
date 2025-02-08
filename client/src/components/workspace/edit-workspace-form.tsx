import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { WorkspaceType } from "@/api/types/api-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editWorkspaceMutationFn } from "@/api/api";
import { Loader } from "lucide-react";
import { PermissionsGuard } from "../reusable/permission-guard";
import { Permissions } from "@/constant";
const editWorkspaceFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Workspace name is required",
  }),
  description: z.string().trim().optional(),
});

type EditWorkspaceFormType = z.infer<typeof editWorkspaceFormSchema>;

interface EditWorkspaceFormProps {
  workspace: WorkspaceType;
}

export function EditWorkspaceForm({ workspace }: EditWorkspaceFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<EditWorkspaceFormType>({
    resolver: zodResolver(editWorkspaceFormSchema),
    defaultValues: {
      name: workspace.name,
      description: workspace.description,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editWorkspaceMutationFn,
    onSuccess: ({ message, workspace }) => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", workspace.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-workspaces"],
      });
      window.toast({
        title: "Success",
        description: message,
        variant: "success",
      });
    },
    onError: (error) => {
      window.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: EditWorkspaceFormType) => {
    if (isPending) return;
    mutate({ workspaceId: workspace.id, data: values });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left">
            Edit Workspace
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Workspace name
                    </FormLabel>
                    <FormControl>
                      <PermissionsGuard
                        callback={
                          <Input
                            readOnly={true}
                            placeholder="Taco's Co."
                            className="!h-[48px] disabled:opacity-90 disabled:pointer-events-none"
                            value={field.value}
                          />
                        }
                        requiredPermission={Permissions.EDIT_WORKSPACE}>
                        <Input
                          placeholder="Taco's Co."
                          className="!h-[48px] disabled:opacity-90 disabled:pointer-events-none"
                          disabled={isPending}
                          {...field}
                        />
                      </PermissionsGuard>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Workspace description
                      <span className="text-xs font-extralight ml-2">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <PermissionsGuard
                        callback={
                          <Textarea
                            rows={6}
                            readOnly
                            className="disabled:opacity-90 disabled:pointer-events-none"
                            placeholder="Our team organizes marketing projects and tasks here."
                            value={field.value}
                          />
                        }
                        requiredPermission={Permissions.EDIT_WORKSPACE}>
                        <Textarea
                          rows={6}
                          disabled={isPending}
                          className="disabled:opacity-90 disabled:pointer-events-none"
                          placeholder="Our team organizes marketing projects and tasks here."
                          {...field}
                        />
                      </PermissionsGuard>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <PermissionsGuard
              callback={
                <div className="text-end text-sm pt-3 italic w-full text-muted-foreground">
                  You do not have the permission to edit this
                </div>
              }
              requiredPermission={Permissions.EDIT_WORKSPACE}>
              <Button
                className="flex place-self-end  h-[40px] text-white font-semibold"
                disabled={isPending}
                type="submit">
                {isPending && <Loader className="animate-spin" />}
                {!isPending ? "Edit Workspace" : "Editing"}
              </Button>
            </PermissionsGuard>
          </form>
        </Form>
      </div>
    </div>
  );
}
