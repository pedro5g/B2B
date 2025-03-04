import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowBigUp, ArrowBigDown, Loader } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: number;
  isLoading: boolean;
}

export const AnalyticsCard = ({
  title,
  value,
  isLoading,
}: AnalyticsCardProps) => {
  return (
    <Card className="shadow-none w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="mb-[0.2px]">
            <ArrowIcon title={title} value={value} />
          </div>
        </div>
        <Activity
          strokeWidth={2.5}
          className="h-4 w-4  text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="w-full">
        <div className="text-3xl font-bold">
          {isLoading ? <Loader className="w-6 h-6 animate-spin" /> : value}
        </div>
      </CardContent>
    </Card>
  );
};

interface ArrowIconProps {
  title: string;
  value: number;
}

const ArrowIcon = ({ title, value }: ArrowIconProps) => {
  if (title === "Overdue Task") {
    return value > 0 ? (
      <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
    ) : (
      <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
    );
  }
  if (title === "Completed Task" || title === "Total Task") {
    return value > 0 ? (
      <ArrowBigUp strokeWidth={2.5} className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowBigDown strokeWidth={2.5} className="h-4 w-4 text-red-500" />
    );
  }
};
