import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { cn } from "../../utils/cn";

/**
 * Reusable Data Table component using TanStack Table.
 */
export function DataTable({
  columns,
  data,
  className,
  onRowClick,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-sm group">
          <input
            placeholder="Filter archive..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 glass-panel rounded-xl text-[11px] font-bold uppercase tracking-wider outline-none focus:border-[var(--admin-accent)]/40 text-[var(--admin-text-primary)] placeholder:text-[var(--admin-text-secondary)]/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest glass-panel rounded-xl disabled:opacity-20 hover:text-[var(--admin-accent)] transition-all"
          >
            Previous
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--admin-text-secondary)]">
            Stage <span className="text-[var(--admin-text-primary)]">{table.getState().pagination.pageIndex + 1}</span> of{" "}
            <span className="text-[var(--admin-text-primary)]">{table.getPageCount()}</span>
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest glass-panel rounded-xl disabled:opacity-20 hover:text-[var(--admin-accent)] transition-all"
          >
            Next
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--admin-panel-border)] bg-[var(--admin-panel)] backdrop-blur-md overflow-hidden shadow-2xl transition-colors duration-500">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--admin-text-primary)]/[0.03] border-b border-[var(--admin-panel-border)] uppercase text-[10px] font-bold tracking-[0.2em] text-[var(--admin-text-secondary)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-[var(--admin-panel-border)]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-[var(--admin-accent)]/[0.03] transition-all cursor-pointer group"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 text-[var(--admin-text-primary)] opacity-80 group-hover:opacity-100 transition-all">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-[var(--admin-text-secondary)] italic">
                  No records found in the vault.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
