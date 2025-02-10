import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface FallbackTooltipProps {
  children: React.ReactNode;
  textHelper: string;
}

export const FallbackTooltip = ({
  children,
  textHelper,
}: FallbackTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{textHelper}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
