import { CurrentUserResponseType } from "@/api/types/api-type";
import { API } from "./axios-client";

export const loginMutationFn = async () => {};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => {};

export const getCurrentUserQueryFn = async () => {
  return await API.GET<CurrentUserResponseType>(`/user/current`);
};

//********* WORKSPACE *****************************//

export const createWorkspaceMutationFn = async () => {};

export const editWorkspaceMutationFn = async () => {};

export const getWorkspaceByIdQueryFn = async () => {};

export const getAllWorkspacesUserIsMemberQueryFn = () => {};

export const getWorkspaceAnalyticsQueryFn = async () => {};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async () => {};

//*******MEMBER ****************

export const invitedUserJoinWorkspaceMutationFn = async () => {};

//********* */
//********* PROJECTS
export const createProjectMutationFn = async () => {};

export const editProjectMutationFn = async () => {};

export const getProjectsInWorkspaceQueryFn = async () => {};

export const getProjectByIdQueryFn = async () => {};

export const getProjectAnalyticsQueryFn = async () => {};

export const deleteProjectMutationFn = async () => {};

//*******TASKS ********************************
//************************* */

export const createTaskMutationFn = async () => {};

export const getAllTasksQueryFn = async () => {};

export const deleteTaskMutationFn = async () => {};
