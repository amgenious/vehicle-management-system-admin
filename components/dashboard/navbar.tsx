'use client'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import clsx from "clsx";
import {
    AudioWaveform,
    Banknote,
    ClipboardPenLine,
    Home,
    LogOut,
    Menu,
    Package,
  } from "lucide-react";
  import Link from "next/link";
import Image from 'next/image';
import { logo } from '@/public/images';

const NavBar= () => {
    const pathname = usePathname();
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-primary px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-black">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/dashboard"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard",
                }
              )}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/bookings"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/bookings",
                }
              )}
            >
              <Package className="h-4 w-4" />
              Bookings
            </Link>
            <Link
              href="/dashboard/servicetracker"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/servicetracker",
                }
              )}
            >
              <AudioWaveform className="h-4 w-4" />
              Service Tracker
            </Link>
            <Link
              href="/dashboard/costsharing"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ": pathname === "/dashboard/costsharing",
                }
              )}
            >
              
              <Banknote className="h-4 w-4" />
            Cost Sharing
            </Link>
            <Link
              href="/dashboard/invoice"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ":
                    pathname === "/dashboard/invoice",
                }
              )}
            >
              <ClipboardPenLine className="h-4 w-4" />
              Invoice
            </Link>
            <Link
              href="/dashboard/servicereports"
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                {
                  "bg-primary text-secondary text-mute ":
                    pathname === "/dashboard/servicereports",
                }
              )}
            >
              <ClipboardPenLine className="h-4 w-4" />
              Service Reports
            </Link>
          </nav>
          <div className="mt-auto">
          <SignOutButton>
            <Button>
                <LogOut />
                <p className='ml-3'>
                Logout
                </p>
            </Button>
           </SignOutButton>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex gap-2 justify-center items-center'>
        <Image src={logo} alt='logo'
        className='w-12 h-12'
        />
        <p className='text-center font-bold text-xl text-black'>AVIC-CCTU MANAGEMENT SYSTEM - Admin Section</p>
      </div>
      
    </header>
  )
}

export default NavBar
