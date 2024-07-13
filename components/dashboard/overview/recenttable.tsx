import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
const RecentTable = () => {
  return (
    <div className='p-3'>
      <p className='text-xl font-medium'>A list of your recent invoices.</p>
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Job Number</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Vehicle Registration Number</TableHead>
      <TableHead>Mileage</TableHead>
      <TableHead>Make/Model</TableHead>
      <TableHead>Chassis Number</TableHead>
      <TableHead>Faulty Description</TableHead>
      <TableHead>Parts Used</TableHead>
      <TableHead>Qty</TableHead>
      <TableHead>Unit Price</TableHead>
      <TableHead>SA</TableHead>
      <TableHead>Manager</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
 
  </TableBody>
</Table>
    </div>

  )
}

export default RecentTable