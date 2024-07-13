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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
    reporting_time: '9:00AM',
    status: "success",
    email: "ken99@yahoo.com",
    name:"Henry",
    vehicle_registration_number:"GM 18394-19",
    vehicle_model:"Camry",
    manufacturer:"Toyota",
    fault:"Brakes not sticking well",
    job_number:10100002,
    phone_number:0o242365073
  },
 
  {
    id: "m5gr84i9",
    reporting_time: '9:00AM',
    status: "success",
    email: "ken99@yahoo.com",
    name:"Jeff",
    vehicle_registration_number:"GM 18394-19",
    vehicle_model:"Camry",
    manufacturer:"Toyota",
    fault:"Brakes not sticking well",
    job_number:10100002,
    phone_number:0o242365073
  },
 
]

export type Booking = {
  id: string
  reporting_time: string
  status: "pending" | "processing" | "success" | "failed"
  email: string
  name: string
  vehicle_registration_number: string
  manufacturer: string
  vehicle_model: string
  fault: string
  job_number: number
  phone_number: number
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
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Email
         
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
},
{
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone_number")}</div>
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
  accessorKey: "manufacturer",
  header: "Manufacturer",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("manufacturer")}</div>
  ),
},
{
  accessorKey: "vehicle_model",
  header: "Vehicle Model",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("vehicle_model")}</div>
  ),
},
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("status")}</div>
  ),
},
{
  accessorKey: "fault",
  header: "Fault",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("fault")}</div>
  ),
},
]

export function DataTableDemo() {
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
