import { Coffee } from "lucide-react";
import { Button } from "./ui/button";

export default function DashboardHeader(){
    return(
        <div className="w-screen sticky top-0 px-[80px] py-2 flex justify-between">
            <div className="flex gap-3 items-center">
                <Coffee/>
                <div className="font-bold text-base">Buy Me Coffe</div>
            </div>
            <Button>Sign Out</Button>
        </div>
    )
}