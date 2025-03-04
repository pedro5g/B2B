import { getCurrentUserQueryFn } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: getCurrentUserQueryFn,
    staleTime: 0,
    retry: 2,
  });
  return query;
};
