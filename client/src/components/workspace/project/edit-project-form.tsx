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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../../ui/textarea";
import { EmojiPickerComponent } from "@/components/emoji-picker";
import { ProjectType } from "@/api/types/api-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProjectMutationFn } from "@/api/api";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";

const editProjectFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Project title is required",
  }),
  description: z.string().trim().optional(),
  emoji: z.string().trim().emoji(),
});

type EditProjectFormSchema = z.infer<typeof editProjectFormSchema>;

interface EditProjectFormProps {
  project: ProjectType;
  onClose: () => void;
}

export const EditProjectForm = ({ project, onClose }: EditProjectFormProps) => {
  const workspaceId = useWorkspaceId();
  const queryClient = useQueryClient();
  const form = useForm<EditProjectFormSchema>({
    resolver: zodResolver(editProjectFormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      emoji: project.emoji || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editProjectMutationFn,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["project", project.id, workspaceId],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-projects", workspaceId],
      });
      window.toast({
        title: "Success",
        description: message,
        variant: "success",
      });
      onClose();
    },
    onError: (error) => {
      console.error(error);
      window.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: EditProjectFormSchema) => {
    if (isPending) return;
    mutate({ projectId: project.id, workspaceId, data: values });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left">
            Edit Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Update the project details to refine task management
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Emoji
              </label>
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="font-normal size-[60px] !p-2 !shadow-none mt-2 
                    items-center rounded-full">
                        <span className="text-4xl">{field.value}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="!p-0">
                      <EmojiPickerComponent onSelectEmoji={field.onChange} />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Project title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" className="!h-[48px]" {...field} />
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
                      Project description
                      <span className="text-xs font-extralight ml-2">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Projects description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isPending}
              className="flex place-self-end  h-[40px] text-white font-semibold"
              type="submit">
              {isPending && <Loader className="animate-spin" />}
              {isPending ? "Editing" : "Edit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
