import { editTaskMutationFn } from "@/api/api";
import { TaskType } from "@/api/types/api-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import { useGetWorkspaceMembers } from "@/hooks/api/use-get-workspace-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  formatDate,
  getAvatarColor,
  getAvatarFallbackText,
  transformOptions,
} from "@/lib/helper";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, Loader } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editTaskFormSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
  description: z.string().trim(),
  projectId: z.string().trim().min(1, {
    message: "Project is required",
  }),
  status: z.enum(
    Object.values(TaskStatusEnum) as [keyof typeof TaskStatusEnum],
    {
      required_error: "Status is required",
    }
  ),
  priority: z.enum(
    Object.values(TaskPriorityEnum) as [keyof typeof TaskPriorityEnum],
    {
      required_error: "Priority is required",
    }
  ),
  assignedTo: z.string().trim().min(1, {
    message: "AssignedTo is required",
  }),
  dueDate: z.date({
    required_error: "A date of birth is required.",
  }),
});

type EditTaskForm = z.infer<typeof editTaskFormSchema>;

interface EditTaskFormProps {
  task: TaskType;
  onClose: () => void;
}

export const EditTaskForm = ({ task, onClose }: EditTaskFormProps) => {
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { data: memberData } = useGetWorkspaceMembers(workspaceId);

  const { mutate, isPending } = useMutation({
    mutationFn: editTaskMutationFn,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      window.toast({
        title: "Success",
        description: message,
        variant: "success",
      });
      onClose();
    },
    onError: (error) => {
      console.log(error);
      window.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<EditTaskForm>({
    resolver: zodResolver(editTaskFormSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: new Date(task.dueDate),
      assignedTo: task.assignedTo?.id || "",
      projectId: task.projectId || "",
    },
  });

  const taskStatusList = Object.values(TaskStatusEnum);
  const taskPriorityList = Object.values(TaskPriorityEnum);
  const statusOptions = useMemo(
    () => transformOptions(taskStatusList),
    [taskStatusList]
  );
  const priorityOptions = useMemo(
    () => transformOptions(taskPriorityList),
    [taskPriorityList]
  );

  const onSubmit = (values: EditTaskForm) => {
    if (isPending) return;
    const { projectId, ...data } = values;
    mutate({ workspaceId, taskId: task.id, projectId, data });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] 
            font-semibold mb-1
           text-center sm:text-left">
            Edit Task
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage tasks, resources, and team collaboration
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Task title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Website Redesign"
                        className="!h-[48px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                      Task description
                      <span className="text-xs font-extralight ml-2">
                        Optional
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea rows={1} placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberData?.members &&
                          memberData.members.map((member) => {
                            const initials = getAvatarFallbackText(
                              member.user.name
                            );
                            const avatarColor = getAvatarColor(initials);

                            return (
                              <SelectItem
                                key={`${member.workspaceId}-${member.user.id}`}
                                value={member.user.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="size-7">
                                    <AvatarImage
                                      src={member.user.profilePictureUrl || ""}
                                      alt={member.user.name}
                                    />
                                    <AvatarFallback className={avatarColor}>
                                      {initials}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.user.name}
                                </div>
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="!mt-2">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full flex-1 pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}>
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={
                            (date) =>
                              date <
                                new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                              date > new Date("2100-12-31") //Prevent selection beyond a far future date
                          }
                          initialFocus
                          defaultMonth={new Date()}
                          fromMonth={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="!text-muted-foreground !capitalize"
                            placeholder="Select a status"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions?.map((status) => (
                          <SelectItem
                            className="!capitalize"
                            key={status.value}
                            value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions?.map((priority) => (
                          <SelectItem
                            className="!capitalize"
                            key={priority.value}
                            value={priority.value}>
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
