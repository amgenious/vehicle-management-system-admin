import { ServiceTrackingTable } from '@/components/dashboard/servicetracking/servicetrackingtable'
import React from 'react'

const ServiceTracker = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-100">
      <div className="w-full p-3 h-fit flex justify-between bg-white">
        <p className="text-primary text-3xl font-black">Service Tracking</p>
      </div>
      <div className="p-3 h-full flex flex-col gap-5">
        <p className="text-xl font-medium">Tracking of Serviced Vehicles</p>
        <ServiceTrackingTable />
      </div>
    </div>
  )
}

export default ServiceTracker