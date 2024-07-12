import ChartSystem from '@/components/dashboard/overview/chartsystem'
import TileCards from '@/components/dashboard/overview/tilecards'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex flex-col flex-1 h-full w-full bg-slate-100'>
     <div className='w-full p-3 h-fit bg-white'><p className='text-primary text-3xl font-black'>Dashboard</p></div>
     <div className='p-3 h-full flex flex-col gap-5'>
        <TileCards />
        <ChartSystem />
     </div>
    </div>
  )
}

export default Dashboard