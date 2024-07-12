import { Card, CardHeader, CardTitle} from '@/components/ui/card'
import { AudioWaveform, Banknote, ClipboardPenLine, Package } from 'lucide-react'
import React from 'react'

const TileCards = () => {
  return (
    <div className="grid gap-5 md:grid-cols-4 grid-cols-1 w-full h-fit text-center">
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Bookings</CardTitle>
        <div className="text-2xl font-bold text-left">0</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-orange-400 rounded-md'>
    <Package className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Service Trackers</CardTitle>
        <div className="text-2xl font-bold text-left">0</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-green-400 rounded-md'>
    <AudioWaveform className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Cost Sharing</CardTitle>
        <div className="text-2xl font-bold text-left">0</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-amber-400 rounded-md'>
    <Banknote className="h-7 w-7 text-white" />
    </div>
        </div>
        <div className='relative pt-5'>
        <Card className="p-2 cursor-pointer">
      <CardHeader className="flex flex-col items-end justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium"> Invoices</CardTitle>
        <div className="text-2xl font-bold text-left">0</div>
      </CardHeader>
    </Card>
    <div className='absolute top-0 left-2 p-5 bg-orange-400 rounded-md'>
    <ClipboardPenLine className="h-7 w-7 text-white" />
    </div>
        </div>
    </div>
  )
}

export default TileCards