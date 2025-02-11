import {
  AllMembersInWorkspaceResponseType,
  AllProjectPayloadType,
  AllProjectResponseType,
  AllTaskPayloadType,
  AllTaskResponseType,
  AllWorkspaceResponseType,
  AnalyticsResponseType,
  ChangeWorkspaceMemberRoleType,
  CreateProjectPayloadType,
  CreateTaskPayloadType,
  CreateWorkspaceResponseType,
  CreateWorkspaceType,
  CurrentUserResponseType,
  EditProjectPayloadType,
  EditWorkspaceType,
  LoginResponseType,
  LoginType,
  ProjectByIdPayloadType,
  ProjectResponseType,
  RegisterType,
  WorkspaceByIdResponseType,
} from "@/api/types/api-type";
import { API } from "./axios-client";

//************************** Auth and User *********************************//

export const loginMutationFn = async (data: LoginType) => {
  return await API.POST<LoginResponseType>(`/auth/login`, data);
};

export const registerMutationFn = async (data: RegisterType) => {
  return await API.POST(`/auth/register`, data);
};

export const logoutMutationFn = async () => {
  return await API.GET("/auth/logout");
};

export const getCurrentUserQueryFn = async () => {
  return await API.GET<CurrentUserResponseType>(`/user/current`);
};

//************************** WORKSPACE *************************************//

export const createWorkspaceMutationFn = async (data: CreateWorkspaceType) => {
  return await API.POST<CreateWorkspaceResponseType>(
    `/workspace/create/new`,
    data
  );
};

export const editWorkspaceMutationFn = async ({
  workspaceId,
  data,
}: EditWorkspaceType) => {
  return await API.PUT<CreateWorkspaceResponseType>(
    `/workspace/update/${workspaceId}`,
    data
  );
};

export const getWorkspaceByIdQueryFn = async (workspaceId: string) => {
  return await API.GET<WorkspaceByIdResponseType>(`/workspace/${workspaceId}`);
};

export const getMembersInWorkspaceQueryFn = async (workspaceId: string) => {
  return await API.GET<AllMembersInWorkspaceResponseType>(
    `/workspace/members/${workspaceId}`
  );
};

export const getAllWorkspacesUserIsMemberQueryFn = async () => {
  return await API.GET<AllWorkspaceResponseType>(`/workspace/all`);
};

export const getWorkspaceAnalyticsQueryFn = async (workspaceId: string) => {
  return API.GET<AnalyticsResponseType>(`/workspace/analytics/${workspaceId}`);
};

export const changeWorkspaceMemberRoleMutationFn = async ({
  workspaceId,
  data,
}: ChangeWorkspaceMemberRoleType) => {
  return await API.PUT(`/workspace/change/member/role/${workspaceId}`, data);
};

export const deleteWorkspaceMutationFn = async (workspaceId: string) => {
  return await API.DELETE<{ message: string }>(
    `/workspace/delete/${workspaceId}`
  );
};

//***************************** MEMBER ***************************************//

export const invitedUserJoinWorkspaceMutationFn = async (
  inviteCode: string
) => {
  return await API.POST<{ message: string; workspaceId: string }>(
    `member/workspace/${inviteCode}/join`
  );
};

//***************************** PROJECT ***************************************//
export const createProjectMutationFn = async ({
  workspaceId,
  data,
}: CreateProjectPayloadType) => {
  return await API.POST<ProjectResponseType>(
    `/project/workspace/${workspaceId}/create`,
    data
  );
};

export const editProjectMutationFn = async ({
  projectId,
  workspaceId,
  data,
}: EditProjectPayloadType) => {
  return await API.PUT<ProjectResponseType>(
    `/project/${projectId}/workspace/${workspaceId}/update`,
    data
  );
};

export const getProjectsInWorkspaceQueryFn = async ({
  workspaceId,
  pageSize = 10,
  pageNumber = 1,
}: AllProjectPayloadType) => {
  return await API.GET<AllProjectResponseType>(
    `/project/workspace/${workspaceId}/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
};

export const getProjectByIdQueryFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType) => {
  return await API.GET<ProjectResponseType>(
    `/project/${projectId}/workspace/${workspaceId}`
  );
};

export const getProjectAnalyticsQueryFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType) => {
  return await API.GET<AnalyticsResponseType>(
    `/project/${projectId}/workspace/${workspaceId}/analytics`
  );
};

export const deleteProjectMutationFn = async ({
  workspaceId,
  projectId,
}: ProjectByIdPayloadType) => {
  return await API.DELETE<{ message: string }>(
    `/project/${projectId}/workspace/${workspaceId}/delete`
  );
};

//***************************** TASKS ****************************************//

export const createTaskMutationFn = async ({
  workspaceId,
  projectId,
  data,
}: CreateTaskPayloadType) => {
  return await API.POST<{ message: string }>(
    `/task/project/${projectId}/workspace/${workspaceId}/create`,
    data
  );
};

export const getAllTasksQueryFn = async ({
  workspaceId,
  keyword,
  projectId,
  assignedTo,
  priority,
  status,
  dueDate,
  pageNumber,
  pageSize,
}: AllTaskPayloadType) => {
  const baseUrl = `/task/workspace/${workspaceId}/all`;

  const queryString = new URLSearchParams();
  if (keyword) queryString.append("keyword", keyword.toString());
  if (projectId) queryString.append("projectId", projectId);
  if (assignedTo) queryString.append("assignedTo", assignedTo.toString());
  if (priority) queryString.append("priority", priority.toString());
  if (status) queryString.append("status", status.toString());
  if (dueDate) queryString.append("dueDate", dueDate);
  if (pageNumber) queryString.append("pageNumber", pageNumber.toString());
  if (pageSize) queryString.append("pageSize", pageSize.toString());

  const url = queryString.toString() ? `${baseUrl}?${queryString}` : baseUrl;

  return await API.GET<AllTaskResponseType>(url);
};

export const deleteTaskMutationFn = async ({
  workspaceId,
  taskId,
}: {
  workspaceId: string;
  taskId: string;
}) => {
  return await API.DELETE<{ message: string }>(
    `task/${taskId}/workspace/${workspaceId}/delete`
  );
};
