import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetWorkspaceMembers } from "@/hooks/api/use-get-workspace-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  formatDate,
  getAvatarColor,
  getAvatarFallbackText,
} from "@/lib/helper";
import { Loader } from "lucide-react";

export const RecentMembers = () => {
  const workspaceId = useWorkspaceId();

  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];

  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader className="size-8 animate-spin place-self-center flex" />
      ) : (
        <ul role="list" className="space-y-3">
          {members.map((member, index) => {
            const user = member.user;
            const initials = getAvatarFallbackText(user.name);
            const fallBackColorSchema = getAvatarColor(initials);

            return (
              <li
                key={index}
                role="listitem"
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <Avatar className="h-9 w-9 sm:flex">
                    <AvatarImage
                      src={user.profilePictureUrl || ""}
                      alt={user.name}
                    />
                    <AvatarFallback className={fallBackColorSchema}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{member.role.name}</p>
                </div>
                <div className="ml-auto text-sm text-gray-500">
                  <p>Joined</p>
                  <p>{formatDate(member.joinAt)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
