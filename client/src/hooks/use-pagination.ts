import { useCallback, useState } from "react";

interface PaginationProps {
  initialPagaSize?: number;
  initialPageNumber?: number;
}

type Pagination = {
  pageSize: number;
  pageNumber: number;
};

export const usePagination = ({
  initialPagaSize = 10,
  initialPageNumber = 1,
}: PaginationProps): [
  Pagination,
  (key: keyof Pagination, value: number) => void
] => {
  const [pagination, setValues] = useState({
    pageSize: initialPagaSize,
    pageNumber: initialPageNumber,
  });

  const setPagination = useCallback((key: keyof Pagination, value: number) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }, []);

  return [pagination, setPagination];
};
