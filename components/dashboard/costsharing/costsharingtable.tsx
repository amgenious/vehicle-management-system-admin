"use client"
import { db } from "@/lib/firebaseConfig";
import React, { useState, useEffect } from "react";

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
import { Loader, Trash } from "lucide-react";


export function CostSharingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const colRef = collection(db, "costsharing");
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
      await deleteDoc(doc(db, "costsharing", id));
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
    <TableHead>Client Name</TableHead>
    <TableHead>Date</TableHead>
    <TableHead>Job Number</TableHead>
    <TableHead>Vehicle Registration Number</TableHead>
    <TableHead>Labour</TableHead>
    <TableHead>Item</TableHead>
    <TableHead>Quantity</TableHead>
    <TableHead>Rikpat(Distribution Price)</TableHead>
    <TableHead>Other Services</TableHead>
    <TableHead>Retail Price</TableHead>
    <TableHead>Total Bill</TableHead>
    <TableHead>CCTU</TableHead>
    <TableHead>Mr. Benedict Blater</TableHead>
    <TableHead>Employee Email</TableHead>
    <TableHead>Action</TableHead>
  </TableRow>
</TableHeader>
          <TableBody>
          {data?.length > 0 && loading == false ? (
            data.map((item: any) => (
              <TableRow key={item.id} className="">
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.Job_number}</TableCell>
              <TableCell>{item.vehicle_registration_number}</TableCell>
              <TableCell>{item.Labour}</TableCell>
              <TableCell>{item.item}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.rikpat}</TableCell>
              <TableCell>{item.otherservices}</TableCell>
              <TableCell>{item.retailprice}</TableCell>
              <TableCell>{item.totalbill}</TableCell>
              <TableCell>{item.CCTU}</TableCell>
              <TableCell>{item.Mr_Benedict_Blater}</TableCell>
              <TableCell>{item.employeeEmail}</TableCell>
              <TableCell>
                    <Trash
                      className="cursor-pointer text-red-700"
                      onClick={(id) => deleteItem(item.id)}
                    />
                  </TableCell>
            </TableRow>))
) : loading ? (
  <Loader
    size={40}
    className="animate-spin ml-2 text-primary text-center"
  />
) : (
  <p>No Data Available</p>
)
}
          </TableBody>
        </Table>
      </div>
      
    </div>
  )
}
