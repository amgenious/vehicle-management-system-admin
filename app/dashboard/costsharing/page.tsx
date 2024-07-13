import { CostSharingTable } from '@/components/dashboard/costsharing/costsharingtable'
import React from 'react'

const CostSharing = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-100">
      <div className="w-full p-3 h-fit flex justify-between bg-white">
        <p className="text-primary text-3xl font-black">Cost Sharing</p>
      </div>
      <div className="p-3 h-full flex flex-col gap-5">

        <CostSharingTable />
      </div>
    </div>
  )
}

export default CostSharing