import { backgroundimage, logo } from "@/public/images";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex h-screen relative">
      <Image 
      src={backgroundimage}
      alt="bg-image"
      className="w-full h-full object-cover"
      />
      <div className="absolute bg-black w-full h-full opacity-70"></div>
      <div className="absolute flex justify-center items-center flex-col w-full h-full">
      <Image src={logo} alt="logo"/>
        <h1 className="text-white font-bold text-4xl flex-wrap text-center mb-5">Welcome to AVIC-CCTU Management System Admin Dashboard</h1>
        <Button  asChild variant="outline">
          <Link href='/dashboard'>
          Go to dashboard
          </Link>
          </Button>

      </div>
    </main>
  );
}
