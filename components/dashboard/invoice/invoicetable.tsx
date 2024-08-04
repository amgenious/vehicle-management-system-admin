"use client"

import { db } from "@/lib/firebaseConfig";
import React, { useState, useEffect } from 'react'

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
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { Loader, Trash } from 'lucide-react';
import Link from "next/link";



export function InvoiceTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "invoice");
  useEffect(() => {
    try {
      const q1 = query(colRef,orderBy("timeStamps","desc"),);
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
  const deleteItem = async (id: any) => {
    try {
      await deleteDoc(doc(db, "invoice", id));
      setData((prevData) => prevData.filter((items: any) => items.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
      </div>
      <div className="rounded-md border">
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
    <TableHead>Action</TableHead>
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
                <TableCell>
                <ul>
                {item.Employeeremarks.map((remark: { id: React.Key | null | undefined; value: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
                  <li key={remark.id}>{remark.value}</li>
                ))}
              </ul>
                </TableCell>
                <TableCell>{item.Net_Price}</TableCell>
                <TableCell className="bg-primary text-white text-center font-bold">
                  <Link href={`invoice/${item.id}`}>
                    Details
                  </Link>
                </TableCell>
                <TableCell>
                    <Trash
                      className="cursor-pointer text-red-700"
                      onClick={(id) => deleteItem(item.id)}
                    />
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
      
    </div>
  )
}
