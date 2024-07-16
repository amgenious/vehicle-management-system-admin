"use client"

import { db } from "@/lib/firebaseConfig";
import React, { useState, useEffect } from 'react'
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
import {
  collection,
  query,
  onSnapshot,
  limit,
  where,
} from "firebase/firestore";
import { Loader } from 'lucide-react';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "servicetracker");
  useEffect(() => {
    try {
        const q1 = query(
            colRef,
        );
        const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
            setLoading(true);
            setData([]);
            let list:any= [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
            console.log(list)
            setLoading(false);
        });
        return () => {
            unsubscribeSnapshot();
        };

    } catch (error) {
        setLoading(false);
        console.error('Error fetching data:', error);
    }
}, []);
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
  type Timestamp = {
    seconds: number;
    nanoseconds: number;
  };
  const formatDate = (timestamp: Timestamp): string => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return date.toUTCString(); // or use any other format you prefer
  };
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
            {/* {table.getHeaderGroups().map((headerGroup) => (
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
            ))} */}
             <TableRow>
    <TableHead>Client Name</TableHead>
    <TableHead>Job Number</TableHead>
    <TableHead>Phone Number</TableHead>
    <TableHead>Serviced Date</TableHead>
    <TableHead>Next Service Date</TableHead>
    <TableHead>Employee Email</TableHead>
  </TableRow>
          </TableHeader>
          <TableBody>
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
              {
                         data?.length > 0 && loading==false ?  (
                            data.map((item:any) => (
                              <TableRow key={item.id} className="">
                              <TableCell className="font-medium">{item.Client_name}</TableCell>
                              <TableCell>
                                {item.Job_number}
                              </TableCell>
                              <TableCell>{item.Phone_number}</TableCell>
                              <TableCell>{formatDate(item.Service_date)}</TableCell>
                              <TableCell>{item.Next_Service_date}</TableCell>
                              <TableCell>{item.employeeEmail}</TableCell>
                            </TableRow>
                            ))
                        ):loading ? (<Loader size={40} className="animate-spin ml-2 text-primary text-center" />
                      ) : (
                        <p>No Data Available</p>
                      )
                    }
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}
