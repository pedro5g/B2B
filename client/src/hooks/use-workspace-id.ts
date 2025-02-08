import { useParams } from "react-router-dom";
/**
 *
 * @description helper to get current workspaceId on url
 *
 * @returns return current workspace id on url
 */
export const useWorkspaceId = () => {
  const params = useParams();
  return params.workspaceId as string;
};
