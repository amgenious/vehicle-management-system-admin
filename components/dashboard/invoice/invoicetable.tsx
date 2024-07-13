"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Booking[] = [
  {
    id: "m5gr84i9",
    date: '1-Jan-24',
    name:"Henry",
    job_number:"1000202020",
    vehicle_registration_number:"GM 18394-19",
    mileage:127888,
    SA:"Engr. Divine Bedzrah",
    Manager:"Engr. Dr. Kwame Anane-Fenin",
    vehicle_model:"Toyota Corolla",
    chassis_number:"56768g768y688y88980j",
    item_used:"Engine Oil",
    quantity:1,
    unit_price:2200,
    net_total:4200,
  },
]

export type Booking = {
  id: string
  date:string
  name:string
  job_number:string
  vehicle_registration_number:string
  mileage:number
  SA:string
  Manager:string
  vehicle_model:string
  chassis_number:string
  item_used:string
  quantity:number
  unit_price:number
  net_total:number
}

export const columns: ColumnDef<Booking>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
{
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("date")}</div>
    ),
  },
{
    accessorKey: "job_number",
    header: "Job Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("job_number")}</div>
    ),
  },
  {
      accessorKey: "vehicle_registration_number",
      header: "Vehicle Registration Number",
      cell: ({ row }) => (
          <div className="capitalize">{row.getValue("vehicle_registration_number")}</div>
        ),
    },
    {
        accessorKey: "mileage",
        header: "Mileage",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("mileage")}</div>
        ),
      },
    {
      accessorKey: "SA",
      header: "SA",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("SA")}</div>
      ),
    },
{
  accessorKey: "Manager",
  header: "Manager",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("Manager")}</div>
  ),
},
{
  accessorKey: "vehicle_model",
  header: "Model/Make",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("vehicle_model")}</div>
  ),
},
{
  accessorKey: "chassis_number",
  header: "Chassis Number",
  cell: ({ row }) => (
    <div className="uppercase">{row.getValue("chassis_number")}</div>
  ),
},
{
    accessorKey: "item_used",
    header: "Item Used",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("item_used")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "unit_price",
    header: "Unit Price",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("unit_price")}</div>
    ),
  },
  {
    accessorKey: "net_total",
    header: "Net total",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("net_total")}</div>
    ),
  },
]

export function InvoiceTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Client's Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}
