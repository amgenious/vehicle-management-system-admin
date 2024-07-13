
import { InvoiceTable } from '@/components/dashboard/invoice/invoicetable'
import React from 'react'

const InvoicePage = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-100">
    <div className="w-full p-3 h-fit flex justify-between bg-white">
      <p className="text-primary text-3xl font-black">Invoice</p>
    </div>
    <div className="p-3 h-full flex flex-col gap-5">
      <InvoiceTable />
    </div>
  </div>
  )
}

export default InvoicePage