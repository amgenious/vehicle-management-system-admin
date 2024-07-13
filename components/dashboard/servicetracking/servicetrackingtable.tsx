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
import { Button } from "@/components/ui/button"
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
    status: "Over Due",
    email: "ken99@yahoo.com",
    name:"Henry",
    vehicle_registration_number:"GM 18394-19",
    phone_number:0o242365073,
    service_date:"1-Jan-24",
    next_service_date:"31-Mar-24",
    days_to_expire:-53

  },
 
 
]

export type Booking = {
  id: string
  reporting_time: string
  status: "Over Due" | "Not over due" 
  email: string
  name: string
  vehicle_registration_number: string
  service_date:string
  next_service_date:string
  days_to_expire:number

 
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
      accessorKey: "vehicle_registration_number",
      header: "Vehicle Registration Number",
      cell: ({ row }) => (
          <div className="capitalize">{row.getValue("vehicle_registration_number")}</div>
        ),
    },
    {
      accessorKey: "service_date",
      header: "Service Date",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("service_date")}</div>
      ),
    },
{
  accessorKey: "next_service_date",
  header: "Next Service Date",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("next_service_date")}</div>
  ),
},
{
  accessorKey: "days_to_expire",
  header: "Days to Expiration",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("days_to_expire")}</div>
  ),
},
{
  accessorKey: "status",
  header: "Status",
  cell: ({ row }) => (
    <div className="capitalize">{row.getValue("status")}</div>
  ),
},

]

export function ServiceTrackingTable() {
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
