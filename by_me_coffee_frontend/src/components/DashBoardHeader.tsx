'use client'

import { Coffee } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardHeader(){
    const router = useRouter()
    const signOut = async ()=>{
        try {
            await axios.post('/api/auth/sign-out')
            localStorage.removeItem('token')
            router.push('/sign-in')
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className="w-screen sticky top-0 px-[80px] py-2 flex justify-between">
            <div className="flex gap-3 items-center">
                <Coffee/>
                <div className="font-bold text-base">Buy Me Coffe</div>
            </div>
            <Button onClick={signOut}>Sign Out</Button>
        </div>
    )
}