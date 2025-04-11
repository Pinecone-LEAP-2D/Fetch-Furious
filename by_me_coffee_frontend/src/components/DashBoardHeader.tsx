"use client";

import { ChevronDown, Coffee } from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useProfile } from "@/provider/ProfileProvider";

export default function DashboardHeader() {
  const router = useRouter();
  const { profile, setProfile , setUser} = useProfile();
  if (!profile) {
    return 
  }
  const signOut = async () => {
    try {
      await axios.post("/api/auth/sign-out");
      localStorage.removeItem("token");
      setProfile(null)
      setUser(false)
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen sticky top-0 px-[80px] bg-white z-50 py-2 flex justify-between">
      <div className="flex gap-3 items-center cursor-pointer" onClick={()=>router.push('/dashboard')}>
        <Coffee />
        <div className="font-bold text-base">Buy Me Coffee</div>
      </div>
      <div className="flex items-center text-lg font-semibold gap-2">
        <Image
          width={40}
          height={20}
          src={profile.avatarImage ? profile.avatarImage : "/next.svg"}
          alt="avatarImage"
          className="w-10 h-10 rounded-full"
        />
        <div> {profile.name}</div>
        <DropdownMenu>
        <DropdownMenuTrigger className="flex pl-4">
            <ChevronDown/>     
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  );
}
