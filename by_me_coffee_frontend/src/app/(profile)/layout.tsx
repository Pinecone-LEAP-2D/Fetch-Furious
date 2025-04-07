import ProfileHeader from "@/components/ProfileHeader";
import { ReactNode } from "react";

export default function ProfileLayout(
    {children}:{children:ReactNode}
){
    return(
        <div className="w-screen flex flex-col">
            <ProfileHeader/>
            {children}
        </div>
    )
}