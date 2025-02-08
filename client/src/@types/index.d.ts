import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    toast: typeof toast;
  }
}
