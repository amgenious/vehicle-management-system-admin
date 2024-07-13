import React from "react";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import { DataTableDemo } from "@/components/dashboard/bookings/bookingstable";

 


const BookingsPage = () => {
  return (
    <div className="flex flex-col flex-1 h-full w-full bg-slate-100">
      <div className="w-full p-3 h-fit flex justify-between bg-white">
        <p className="text-primary text-3xl font-black">Bookings</p>
        <div className="relative">
        <Input type="text" placeholder="Search Bookings"/>
        <Search className="absolute top-3 right-3 text-muted-foreground w-5 h-5 cursor-pointer" />
        </div>
      </div>
      <div className="p-3 h-full flex flex-col gap-5">
        <p className="text-xl font-medium">List of all bookings.</p>
        <DataTableDemo />
      </div>
    </div>
  );
};

export default BookingsPage;
