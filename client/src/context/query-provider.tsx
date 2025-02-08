import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Props) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (failureCount < 2 && error?.message === "Network Error") {
                return true;
              }
              return false;
            },
            retryDelay: 0,
          },
        },
      })
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // provides a utility toast
      window.toast = toast;
    }
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
