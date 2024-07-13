"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
    Home,
    Package,
    AudioWaveform,
    Banknote,
    ClipboardPenLine
  } from "lucide-react"

const SideBarLinks = () => {
const pathname = usePathname();
  return (
    <div className="flex-1 pt-5">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            href="/dashboard"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
            {
              'bg-primary text-white text-muted': pathname === "/dashboard",
            },
            ) 
            }
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/bookings"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
            {
              'bg-primary text-white text-muted': pathname === "/dashboard/bookings",
            },
            ) 
            }
          >
            <Package className="h-4 w-4" />
            Bookings
          </Link>
          <Link
            href="/dashboard/servicetracker"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
            {
              'bg-primary text-white text-muted': pathname === "/dashboard/servicetracker",
            },
            ) 
            }
          >
            <AudioWaveform className="h-4 w-4" />
            Service Tracker
          </Link>
          <Link
            href="/dashboard/costsharing"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
            {
              'bg-primary text-white text-muted': pathname === "/dashboard/costsharing",
            },
            ) 
            }
          >
            <Banknote className="h-4 w-4" />
            Cost Sharing
          </Link>
          <Link
            href="/dashboard/invoice"
            className={clsx("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all",
            {
              'bg-primary text-white text-muted': pathname === "/dashboard/invoice",
            },
            ) 
            }
          >
            <ClipboardPenLine className="h-4 w-4" />
            Invoice
          </Link>
        </nav>
      </div>

  )
}

export default SideBarLinks