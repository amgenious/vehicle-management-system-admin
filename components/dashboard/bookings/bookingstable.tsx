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
    status: "success",
    email: "ken99@yahoo.com",
    name:"Henry",
    vehicle_registration_number:"GM 18394-19",
    vehicle_model:"Camry",
    manufacturer:"Toyota",
    fault:"Brakes not sticking well",
    job_number:10100002,
    phone_number:"0242365073"
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
    phone_number:"0242365073"
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
  phone_number: string
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "bookings");
  const [sorting, setSorting] = React.useState<SortingState>([])
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
          <TableRow>
            <TableHead>Job Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Vehicle Registration Number</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Fault</TableHead>
          </TableRow>
        </TableHeader>
          <TableBody>
             {
                         data?.length > 0 && loading==false ?  (
                            data.map((item:any) => (
                                <TableRow key={item.id} className=''>
                                    <TableCell className="font-medium">{item.Job_number}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.phonenumber}</TableCell>
                                    <TableCell>{item.carnumber}</TableCell>
                                    <TableCell>{item.manufacturer}</TableCell>
                                    <TableCell>{item.model}</TableCell>
                                    <TableCell className="truncate">{item.faultdescription}</TableCell>
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
