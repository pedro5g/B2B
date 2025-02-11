import { useMemo } from "react";
import { getColumns } from "./table/columns";
import { DataTable } from "./table/table";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "./table/table-faceted-filter";
import { priorities, statuses } from "./table/data";
import { useTaskTableFilter } from "@/hooks/use-task-table-filter";
import { usePagination } from "@/hooks/use-pagination";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useQuery } from "@tanstack/react-query";
import { getAllTasksQueryFn } from "@/api/api";
import { useGetProjectsInWorkspaceQuery } from "@/hooks/api/use-get-projects";
import { useGetWorkspaceMembers } from "@/hooks/api/use-get-workspace-members";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Filters = ReturnType<typeof useTaskTableFilter>[0];
type SetFilters = ReturnType<typeof useTaskTableFilter>[1];

interface DataTableFilterToolbarProps {
  isLoading?: boolean;
  projectId?: string;
  filters: Filters;
  setFilters: SetFilters;
}

export const TaskTable = () => {
  const param = useParams();
  const projectId = param.projectId || "";
  const workspaceId = useWorkspaceId();
  const [{ pageSize, pageNumber }, setPagination] = usePagination({
    initialPageNumber: 1,
    initialPagaSize: 10,
  });

  const [filters, setFilters] = useTaskTableFilter();

  const columns = getColumns(projectId);

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-tasks",
      workspaceId,
      pageNumber,
      pageSize,
      filters,
      projectId,
    ],
    queryFn: () =>
      getAllTasksQueryFn({
        workspaceId,
        keyword: filters.keyword,
        priority: filters.priority,
        status: filters.status,
        projectId: projectId || filters.projectId,
        assignedTo: filters.assigneeId,
        pageSize,
        pageNumber,
      }),
  });

  const tasks = data?.tasks || [];
  const totalCount = data?.pagination.totalCount || 0;

  const handlePageChange = (page: number) => {
    setPagination("pageNumber", page);
  };
  const handlePageSizeChange = (size: number) => {
    setPagination("pageSize", size);
  };

  return (
    <div className="w-full relative">
      <DataTable
        isLoading={false}
        data={tasks}
        columns={columns}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pagination={{
          totalCount,
          pageNumber,
          pageSize,
        }}
        filtersToolbar={
          <DataTableFilterToolbar
            isLoading={isLoading}
            projectId={projectId}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />
    </div>
  );
};

export const DataTableFilterToolbar = ({
  isLoading,
  projectId,
  filters,
  setFilters,
}: DataTableFilterToolbarProps) => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetProjectsInWorkspaceQuery({ workspaceId });
  const { data: memberData } = useGetWorkspaceMembers(workspaceId);

  const projects = useMemo(() => data?.projects || [], [data?.projects]);
  const members = useMemo(
    () => memberData?.members || [],
    [memberData?.members]
  );

  const projectOptions = useMemo(() => {
    return projects?.map((project) => {
      return {
        label: (
          <div className="flex items-center gap-1">
            <span>{project.emoji}</span>
            <span>{project.name}</span>
          </div>
        ),
        value: project.id,
      };
    });
  }, [projects]);

  const assigneesOptions = useMemo(() => {
    return members?.map((member) => {
      const name = member.user.name || "Unknown";
      const initials = getAvatarFallbackText(name);
      const fallbackColorSchema = getAvatarColor(initials);

      return {
        label: (
          <div className="flex items-center space-x-2">
            <Avatar className="size-7">
              <AvatarImage
                src={member.user.profilePictureUrl || ""}
                alt={name}
              />
              <AvatarFallback className={fallbackColorSchema}>
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        ),
        value: member.user.id,
      };
    });
  }, [members]);

  const handleFilterChange = (key: keyof Filters, values: string[]) => {
    if (key !== "projectId") {
      setFilters({
        ...filters,
        [key]: values,
      });
    } else {
      setFilters({
        ...filters,
        [key]: values.length > 0 ? values.join(",") : null,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2  lg:space-y-0">
      <Input
        placeholder="Filter tasks..."
        value={filters.keyword || ""}
        onChange={(e) => {
          const values = e.target.value.split(/[\s,]+/g); // Regex for comma and spaces
          setFilters({
            keyword: values,
          });
        }}
        className="h-8 w-full lg:w-[250px]"
      />
      {/* Status filter */}
      <DataTableFacetedFilter
        title="Status"
        multiSelect={true}
        options={statuses}
        disabled={isLoading}
        selectedValues={filters.status || []}
        onFilterChange={(values) => handleFilterChange("status", values)}
      />

      {/* Priority filter */}
      <DataTableFacetedFilter
        title="Priority"
        multiSelect={true}
        options={priorities}
        disabled={isLoading}
        selectedValues={filters.priority || []}
        onFilterChange={(values) => handleFilterChange("priority", values)}
      />

      {/* Assigned To filter */}
      <DataTableFacetedFilter
        title="Assigned To"
        multiSelect={true}
        options={assigneesOptions}
        disabled={isLoading}
        selectedValues={filters.assigneeId || []}
        onFilterChange={(values) => handleFilterChange("assigneeId", values)}
      />

      {!projectId && (
        <DataTableFacetedFilter
          title="Projects"
          multiSelect={false}
          options={projectOptions}
          disabled={isLoading}
          selectedValues={filters.projectId?.split(",") || []}
          onFilterChange={(values) => handleFilterChange("projectId", values)}
        />
      )}

      {Object.values(filters).some(
        (value) => value !== null && value !== ""
      ) && (
        <Button
          disabled={isLoading}
          variant="ghost"
          className="h-8 px-2 lg:px-3"
          onClick={() =>
            setFilters({
              keyword: null,
              status: null,
              priority: null,
              projectId: null,
              assigneeId: null,
            })
          }>
          Reset
          <X />
        </Button>
      )}
    </div>
  );
};
