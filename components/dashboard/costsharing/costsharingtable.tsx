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
    vehicle_registration_number:"GM 18394-19",
    job_number:"1000202020",
    labour:2000,
    item_used:"Engine Oil",
    quantity:1,
    rikpat:2100,
    retail_price:2200,
    other_services:"",
    total_bill:4200,
    CCTU:1000,
    benedict_blater:1000
  },
 
 
]

export type Booking = {
  id: string
  name:string
  date:string
  vehicle_registration_number:string
  job_number:string
  labour:number
  item_used:string
  rikpat:number
  quantity:number
  retail_price:number
  other_services:string
  total_bill:number
  CCTU:number
  benedict_blater:number
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
      accessorKey: "vehicle_registration_number",
      header: "Vehicle Registration Number",
      cell: ({ row }) => (
          <div className="capitalize">{row.getValue("vehicle_registration_number")}</div>
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
      accessorKey: "labour",
      header: "Labour",
      cell: ({ row }) => (
        <div className="capitalize">Ghc {row.getValue("labour")}</div>
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
  accessorKey: "rikpat",
  header: "Rikpat (Distribution Price)",
  cell: ({ row }) => (
    <div className="capitalize">Ghc {row.getValue("rikpat")}</div>
  ),
},
{
    accessorKey: "retail_price",
    header: "Retail Price",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("retail_price")}</div>
    ),
  },
  {
    accessorKey: "other_services",
    header: "Other Services",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("other_services")}</div>
    ),
  },
  {
    accessorKey: "total_bill",
    header: "Total Bill",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("total_bill")}</div>
    ),
  },
  {
    accessorKey: "CCTU",
    header: "CCTU",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("CCTU")}</div>
    ),
  },
  {
    accessorKey: "benedict_blater",
    header: "Mr. Benedict Blater",
    cell: ({ row }) => (
      <div className="capitalize">Ghc {row.getValue("benedict_blater")}</div>
    ),
  },
]

export function CostSharingTable() {
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
        {/* <Input
          placeholder="Client's Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
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
            <p>No Data Available</p>
            {/* {table.getRowModel().rows?.length ? (
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
            )} */}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}
