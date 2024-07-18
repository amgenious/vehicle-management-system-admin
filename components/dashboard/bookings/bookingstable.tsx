"use client";

import { db } from "@/lib/firebaseConfig";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Loader, Trash } from "lucide-react";

export function DataTableDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "bookings");
  useEffect(() => {
    try {
      const q1 = query(colRef);
      const unsubscribeSnapshot = onSnapshot(q1, (snapShot) => {
        setLoading(true);
        setData([]);
        let list: any = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
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
      await deleteDoc(doc(db, "bookings", id));
      setData((prevData) => prevData.filter((items: any) => items.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4"></div>
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
              <TableHead>Mileage</TableHead>
          
              <TableHead>Fault</TableHead>
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
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phonenumber}</TableCell>
                  <TableCell>{item.carnumber}</TableCell>
                  <TableCell>{item.manufacturer}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.mileage}</TableCell>
                
                  <TableCell className="truncate">
                    {item.faultdescription}
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
  );
}
