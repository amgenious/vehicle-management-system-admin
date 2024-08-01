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
  orderBy,
} from "firebase/firestore";
import { Loader, Trash } from "lucide-react";

export function ServiceTrackingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "servicetracker");
  useEffect(() => {
    try {
      const q1 = query(colRef,orderBy("timeStamps","desc"));
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

  type Timestamp = {
    seconds: number;
    nanoseconds: number;
  };
  const formatDate = (timestamp: Timestamp): string => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    return date.toUTCString(); // or use any other format you prefer
  };
  const deleteItem = async (id: any) => {
    try {
      await deleteDoc(doc(db, "servicetracker", id));
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
              <TableHead>Client Name</TableHead>
              <TableHead>Job Number</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Vehicle Registration Number</TableHead>
              <TableHead>Serviced Date</TableHead>
              <TableHead>Next Service Date</TableHead>
              <TableHead>Employee Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length > 0 && loading == false ? (
              data.map((item: any) => (
                <TableRow key={item.id} className="">
                  <TableCell className="font-medium">
                    {item.Client_name}
                  </TableCell>
                  <TableCell>{item.Job_number}</TableCell>
                  <TableCell>{item.Phone_number}</TableCell>
                  <TableCell>{item.Vehicle_Registration_number}</TableCell>
                  <TableCell>{formatDate(item.Service_date)}</TableCell>
                  <TableCell>{item.Next_Service_date}</TableCell>
                  <TableCell>{item.employeeEmail}</TableCell>
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
