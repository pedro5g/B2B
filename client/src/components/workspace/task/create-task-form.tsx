import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../../ui/textarea";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  formatDate,
  getAvatarColor,
  getAvatarFallbackText,
  transformOptions,
} from "@/lib/helper";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskMutationFn } from "@/api/api";
import { useMemo } from "react";
import { useGetProjectsInWorkspaceQuery } from "@/hooks/api/use-get-projects";
import { useGetWorkspaceMembers } from "@/hooks/api/use-get-workspace-members";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const createTaskFormSchema = z.object({
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

type CreateTaskFrom = z.infer<typeof createTaskFormSchema>;

interface CreateTaskFormProps {
  projectId?: string;
  onClose: () => void;
}

export function CreateTaskForm({
  projectId = "",
  onClose,
}: CreateTaskFormProps) {
  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: createTaskMutationFn,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: ["project-analytics", projectId],
      });
      queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
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

  const { data, isLoading } = useGetProjectsInWorkspaceQuery({
    workspaceId,
    skip: !!projectId,
  });

  const { data: memberData } = useGetWorkspaceMembers(workspaceId);

  const form = useForm<CreateTaskFrom>({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      projectId,
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

  const onSubmit = (values: CreateTaskFrom) => {
    if (isPending) return;
    mutate({ workspaceId, projectId: values.projectId, data: values });
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] 
            font-semibold mb-1
           text-center sm:text-left">
            Create Task
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

            {!projectId && (
              <div>
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a project" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoading ? (
                            <div className="my-2">
                              <Loader className="size-4 place-self-center animate-spin" />
                            </div>
                          ) : (
                            <div
                              className="w-full max-h-[200px] overflow-y-auto 
                          scrollbar">
                              {data?.projects &&
                                data.projects.map((project) => (
                                  <SelectItem
                                    key={project.id}
                                    value={project.id}>
                                    <div className="flex items-center gap-1">
                                      <span>{project.name}</span>
                                      <span>{project.emoji}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

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
              {isPending ? "Creating" : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
