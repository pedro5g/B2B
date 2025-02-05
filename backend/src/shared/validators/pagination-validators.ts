import { z } from 'zod';

interface PaginationValidator {
  pageSize: number;
  pageNumber: number;
}

export const paginationValidator = (
  defaultValues: PaginationValidator = {
    pageNumber: 1,
    pageSize: 10,
  },
) => {
  const { pageSize, pageNumber } = defaultValues;
  return z.object({
    pageSize: z.coerce
      .number()
      .int()
      .optional()
      .transform((value) => {
        if (!value) return pageSize;
        if (value <= 0) return pageSize;
        return value;
      }),
    pageNumber: z.coerce
      .number()
      .int()
      .optional()
      .transform((value) => {
        if (!value) return pageNumber;
        if (value <= 0) return pageNumber;
        return value;
      }),
  });
};
