import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
} from "@/constant";
import {
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
  parseAsArrayOf,
} from "nuqs";

export const useTaskTableFilter = () => {
  return useQueryStates({
    status: parseAsArrayOf<TaskStatusEnumType>(
      parseAsStringEnum(Object.values(TaskStatusEnum))
    ),
    priority: parseAsArrayOf<TaskPriorityEnumType>(
      parseAsStringEnum(Object.values(TaskPriorityEnum))
    ),
    keyword: parseAsArrayOf(parseAsString),
    projectId: parseAsString,
    assigneeId: parseAsArrayOf(parseAsString),
  });
};
