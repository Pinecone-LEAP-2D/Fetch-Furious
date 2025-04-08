"use client";

import { Button } from "@/components/ui/button";
import { getProfile } from "@/utils/request";
import { Profile } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile>()
  const fetchProfile = async () => {
    try {
        const response = await getProfile(8)
        setProfile(response?.data.result)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    fetchProfile()
  },[]);

  return (
    <div className="w-scree items-center flex flex-col">
      <div className="w-full h-[500px]">
        <Image
          width={20}
          height={20}
          alt="backgroundImage"
          className="w-full h-full"
          src={"/next.svg"}
        />
      </div>
      <div className="flex gap-6 w-[90%]">
        <div className="flex flex-col gap-5 w-full">
          <div className="p-6 border rounded-lg flex flex-col gap-6">
            <div className="w-full flex justify-between border-b border-[#E4E4E7] pb-8">
                <div className="flex gap-3 items-center">
                    <Image alt="avatarImage" height={12} width={12} src={'/vercel.svg'}  className="border w-12 h-12 rounded-full"/>
                    <div className="text-xl font-semibold">{username}</div>
                </div>
                <Button variant='secondary' className="cursor-pointer">Edit Page</Button>
            </div>
            <div>
                <p className="font-semibold text-lg">About {username}</p>
                <div>{profile?.about}</div>
            </div>
          </div>
          <div className="p-6 border rounded-lg">
            <div className="text-lg font-semibold">Social Media URL</div>
          </div>
          <div className="p-6 border rounded-lg"></div>
        </div>
        <div className="flex flex-col gap-5 w-full border rounded-lg">
          <div className="p-6"></div>
          <div className="p-6"></div>
          <div className="p-6"></div>
        </div>
      </div>
    </div>
  );
}
