import { ChevronDown, Loader } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useGetWorkspaceMembers } from "@/hooks/api/use-get-workspace-members";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-provider";
import { Permissions } from "@/constant";
import { changeWorkspaceMemberRoleMutationFn } from "@/api/api";

export const AllMembers = () => {
  const { user, hasPermission } = useAuthContext();

  const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];
  const roles = data?.roles || [];

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: changeWorkspaceMemberRoleMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", workspaceId],
      });
      window.toast({
        title: "Success",
        description: "Member's role changed successfully",
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

  const handleSelect = (roleId: string, memberId: string) => {
    if (!roleId || !memberId) return;
    mutate({ workspaceId, data: { roleId, memberId } });
  };

  return (
    <div className="grid gap-6 pt-2">
      {isPending ? (
        <Loader className="size-8 animate-spin place-self-center flex" />
      ) : (
        members.map((member, i) => {
          const initials = getAvatarFallbackText(member.user.name);
          const fallbackColorSchema = getAvatarColor(initials);

          return (
            <div
              key={member.user.id + "_" + i}
              className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={member.user.profilePictureUrl || ""}
                    alt={member.user.name}
                  />
                  <AvatarFallback className={fallbackColorSchema}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {member.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.user.email || ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto min-w-24 capitalize disabled:opacity-95 disabled:pointer-events-none"
                      disabled={
                        isLoading ||
                        !canChangeMemberRole ||
                        member.user.id === user?.id
                      }>
                      {member.role.name.toLowerCase()}{" "}
                      {canChangeMemberRole && member.user.id !== user?.id && (
                        <ChevronDown className="text-muted-foreground" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  {canChangeMemberRole && (
                    <PopoverContent className="p-0" align="end">
                      <Command>
                        <CommandInput
                          placeholder="Select new role..."
                          disabled={isLoading}
                          className="disabled:pointer-events-none"
                        />
                        <CommandList>
                          {isLoading ? (
                            <Loader className="w-8 h-8 animate-spin place-self-center flex my-4" />
                          ) : (
                            <>
                              <CommandEmpty>No roles found.</CommandEmpty>
                              <CommandGroup>
                                {roles?.map(
                                  (role) =>
                                    role.name !== "OWNER" && (
                                      <CommandItem
                                        key={role.id}
                                        disabled={isLoading}
                                        className="disabled:pointer-events-none gap-1 mb-1  flex flex-col items-start px-4 py-2 cursor-pointer"
                                        onSelect={() => {
                                          handleSelect(role.id, member.user.id);
                                        }}>
                                        <p className="capitalize">
                                          {role.name?.toLowerCase()}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {role.name === "ADMIN" &&
                                            `Can view, create, edit tasks, project and manage settings .`}

                                          {role.name === "MEMBER" &&
                                            `Can view,edit only task created by.`}
                                        </p>
                                      </CommandItem>
                                    )
                                )}
                              </CommandGroup>
                            </>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  )}
                </Popover>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
