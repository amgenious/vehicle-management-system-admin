'use client'
import { db } from "@/lib/firebaseConfig";
import React, { useState, useEffect } from 'react'
import {
  collection,
  query,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { Loader } from 'lucide-react';
import Link from "next/link";
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "invoice");
  useEffect(() => {
    try {
      const q1 = query(colRef,limit(5));
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        setLoading(true);
        setData([]);
        let list: any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setLoading(false);
      });
      return () => {
        unsubscribeSnapshot();
      };
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }, []);
  return (
    <div className='p-3'>
      <p className='text-xl font-medium'>A list of your recent invoices.</p>
      <Table>
<TableHeader>
  <TableRow>
    <TableHead>Job Number</TableHead>
    <TableHead>Client Name</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Faulty Description</TableHead>
    <TableHead>Remarks</TableHead>
    <TableHead>Net Total</TableHead>
    <TableHead>More Details</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
{data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
                <TableCell className="font-medium">
                  {item.Job_number}
                </TableCell>
                <TableCell>{item.Client_name}</TableCell>
                <TableCell>{item.Vehicle_Registration_Number}</TableCell>
                <TableCell>{item.fault}</TableCell>
                <TableCell>{item.Employeeremarks}</TableCell>
                <TableCell>{item.Net_Price}</TableCell>
                <TableCell className="bg-primary text-white text-center font-bold">
                  <Link href={`dashboard/invoice/${item.id}`}>
                    Details
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : loading ? (
            <Loader
              size={40}
              className="animate-spin ml-2 text-primary text-center"
            />
          ) : (
            <p>No Data Available</p>
          )}
</TableBody>
</Table>
    </div>

  )
}

export default RecentTable