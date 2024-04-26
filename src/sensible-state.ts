import {
  MRT_ColumnFilterFnsState,
  MRT_ColumnFiltersState,
  MRT_DensityState,
  MRT_ExpandedState,
  MRT_FilterOption,
  MRT_GroupingState,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_TableOptions,
  MRT_VisibilityState,
} from "mantine-react-table";
import { MRT_RowData, MRT_TableState } from "mantine-react-table";
import { useMemo, useState } from "react";

// TODO: implement this when issues are fixed in the library

export type SensibleState<TData extends MRT_RowData> = Pick<
  MRT_TableState<TData>,
  | "density"
  | "columnVisibility"
  | "sorting"
  | "expanded"
  | "grouping"
  | "pagination"
  | "rowPinning"
  | "columnOrder"
  | "globalFilter"
  | "rowSelection"
  | "columnFilters"
  | "columnPinning"
  | "globalFilterFn"
  | "columnFilterFns"
  | "showGlobalFilter"
  | "showColumnFilters"
>;

export type SensibleStateChangeFunctions<TData extends MRT_RowData> = Pick<
  MRT_TableOptions<TData>,
  | "onDensityChange"
  | "onColumnVisibilityChange"
  | "onSortingChange"
  | "onExpandedChange"
  | "onGroupingChange"
  | "onPaginationChange"
  | "onRowPinningChange"
  | "onColumnOrderChange"
  | "onGlobalFilterChange"
  | "onRowSelectionChange"
  | "onColumnFiltersChange"
  | "onColumnPinningChange"
  | "onGlobalFilterFnChange"
  | "onColumnFilterFnsChange"
  | "onShowGlobalFilterChange"
  | "onShowColumnFiltersChange"
>;

export function useSensibleTableState<TData extends MRT_RowData>(
  initialState: Partial<MRT_TableState<TData>>,
): [SensibleState<TData>, SensibleStateChangeFunctions<TData>] {
  const [density, onDensityChange] = useState<MRT_DensityState>(
    () => initialState.density ?? "md",
  );
  const [columnVisibility, onColumnVisibilityChange] =
    useState<MRT_VisibilityState>(() => initialState.columnVisibility ?? {});
  const [sorting, onSortingChange] = useState<MRT_SortingState>(
    () => initialState.sorting ?? [],
  );
  const [expanded, onExpandedChange] = useState<MRT_ExpandedState>(
    () => initialState.expanded ?? {},
  );
  const [grouping, onGroupingChange] = useState<MRT_GroupingState>(
    () => initialState.grouping ?? [],
  );
  const [pagination, onPaginationChange] = useState<MRT_PaginationState>(
    () => initialState.pagination ?? { pageIndex: 0, pageSize: 10 },
  );
  const [rowPinning, onRowPinningChange] = useState<
    MRT_TableState<TData>["rowPinning"]
  >(
    () =>
      initialState.rowPinning ?? {
        bottom: [],
        top: [],
      },
  );
  const [columnOrder, onColumnOrderChange] = useState<
    MRT_TableState<TData>["columnOrder"]
  >(() => initialState.columnOrder ?? []);
  const [globalFilter, onGlobalFilterChange] = useState<any>(
    () => initialState.globalFilter,
  );
  const [rowSelection, onRowSelectionChange] = useState<
    MRT_TableState<TData>["rowSelection"]
  >(() => initialState.rowSelection ?? {});
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    () => initialState.columnFilters ?? [],
  );

  const onColumnFiltersChange: SensibleStateChangeFunctions<TData>["onColumnFiltersChange"] =
    (updaterOrValue) => {
      if (updaterOrValue instanceof Function) {
        setColumnFilters((prev) => {
          const next = updaterOrValue(prev);
          console.log("next", next);
          return next;
        });
      } else {
        console.log("next", updaterOrValue);
        setColumnFilters(updaterOrValue);
      }
    };

  const [columnPinning, onColumnPinningChange] = useState<
    MRT_TableState<TData>["columnPinning"]
  >(() => initialState.columnPinning ?? {});
  const [globalFilterFn, onGlobalFilterFnChange] = useState<MRT_FilterOption>(
    () => initialState.globalFilterFn ?? "fuzzy",
  );
  const [columnFilterFns, onColumnFilterFnsChange] =
    useState<MRT_ColumnFilterFnsState>(
      () => initialState.columnFilterFns ?? {},
    );
  const [showGlobalFilter, onShowGlobalFilterChange] = useState(
    () => initialState.showGlobalFilter ?? false,
  );
  const [showColumnFilters, onShowColumnFiltersChange] = useState(
    () => initialState.showColumnFilters ?? false,
  );

  const sensibleStateChangeFunctions =
    useMemo((): SensibleStateChangeFunctions<TData> => {
      return {
        onDensityChange,
        onColumnVisibilityChange,
        onSortingChange,
        onExpandedChange,
        onGroupingChange,
        onPaginationChange,
        onRowPinningChange,
        onColumnOrderChange,
        onGlobalFilterChange,
        onRowSelectionChange,
        onColumnFiltersChange,
        onColumnPinningChange,
        onGlobalFilterFnChange,
        onColumnFilterFnsChange,
        onShowGlobalFilterChange,
        onShowColumnFiltersChange,
      };
    }, [
      onDensityChange,
      onColumnVisibilityChange,
      onSortingChange,
      onExpandedChange,
      onGroupingChange,
      onPaginationChange,
      onRowPinningChange,
      onColumnOrderChange,
      onGlobalFilterChange,
      onRowSelectionChange,
      onColumnFiltersChange,
      onColumnPinningChange,
      onGlobalFilterFnChange,
      onColumnFilterFnsChange,
      onShowGlobalFilterChange,
      onShowColumnFiltersChange,
    ]);

  const sensibleState = useMemo((): SensibleState<TData> => {
    return {
      density,
      columnVisibility,
      sorting,
      expanded,
      grouping,
      pagination,
      rowPinning,
      columnOrder,
      globalFilter,
      rowSelection,
      columnFilters, // doesnt work together with column filter fns
      columnPinning,
      globalFilterFn,
      columnFilterFns,
      showGlobalFilter,
      showColumnFilters,
    };
  }, [
    density,
    columnVisibility,
    sorting,
    expanded,
    grouping,
    pagination,
    rowPinning,
    columnOrder,
    globalFilter,
    rowSelection,
    columnFilters,
    columnPinning,
    globalFilterFn,
    columnFilterFns,
    showGlobalFilter,
    showColumnFilters,
  ]);

  return useMemo(
    () => [sensibleState, sensibleStateChangeFunctions],
    [sensibleState, sensibleStateChangeFunctions],
  );
}
