"use client";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter()
  return (
    <div className="sticky mt-[120px] top-[220px] left-[80px] flex flex-col gap-1 w-[300px]">
      <Button className="flex items-cente bg-[#F4F4F5] text-black" onClick={()=>router.push('/dashboard')}>Home</Button>
      <Button className="flex items-cente bg-[#F4F4F5] text-black" onClick={()=>router.push('/explore')}>Explore</Button>
      <Button onClick={()=>router.push('/viewpage')} className="flex items-cente bg-[#F4F4F5] text-black">
        View page <ExternalLink />
      </Button>
      <Button className="flex items-cente bg-[#F4F4F5] text-black" onClick={()=>router.push('/settings')}>Account settings</Button>
    </div>
  );
}
